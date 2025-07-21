import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { parseEther } from 'viem';
import ETHBalance from './ETHBalance';

interface CounterProps {
  contractAddress: string;
  name: string;
  abi: any[];
}

export default function Counter({ contractAddress, name, abi }: CounterProps) {
  const { publicClient, walletClient, address, isConnected } = useWeb3();
  const [currentNumber, setCurrentNumber] = useState<bigint>(0n);
  const [inputValue, setInputValue] = useState<string>('');
  const [ethValue, setEthValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');

  // Fetch current counter value
  const fetchCounterValue = async () => {
    if (!publicClient) return;
    
    try {
      const result = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: 'number',
        args: [],
      });
      setCurrentNumber(result as unknown as bigint);
    } catch (error) {
      console.error('Failed to fetch counter value:', error);
    }
  };

  // Execute contract function
  const executeFunction = async (functionName: string, args: any[] = [], value?: bigint) => {
    if (!walletClient || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setTxHash('');

    try {
      const hash = await walletClient.writeContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName,
        args,
        value,
        account: address as `0x${string}`,
        chain: null,
      });
      
      setTxHash(hash);
      
      // Wait for transaction confirmation
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
        await fetchCounterValue(); // Refresh counter value
      }
    } catch (error) {
      console.error(`Failed to execute ${functionName}:`, error);
      alert(`Transaction failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Contract function handlers
  const handleIncrement = () => executeFunction('increment');
  
  const handleSetNumber = () => {
    if (!inputValue) return;
    const value = BigInt(inputValue);
    executeFunction('setNumber', [value]);
  };
  
  const handleAddNumber = () => {
    if (!inputValue) return;
    const value = BigInt(inputValue);
    executeFunction('addNumber', [value]);
  };
  
  const handleMulNumber = () => {
    if (!inputValue) return;
    const value = BigInt(inputValue);
    executeFunction('mulNumber', [value]);
  };
  
  const handleAddFromMsgValue = () => {
    if (!ethValue) return;
    const value = parseEther(ethValue);
    executeFunction('addFromMsgValue', [], value);
  };

  // Fetch counter value on component mount and when connected
  useEffect(() => {
    if (publicClient) {
      fetchCounterValue();
      // Set up polling to refresh counter value every 5 seconds
      const interval = setInterval(fetchCounterValue, 5000);
      return () => clearInterval(interval);
    }
  }, [publicClient, contractAddress]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
        <p className="text-gray-400 text-sm font-mono">{contractAddress}</p>
      </div>

      {/* Current Counter Value */}
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Current Value</h3>
        <div className="text-4xl font-bold text-blue-400">{currentNumber.toString()}</div>
      </div>

      {/* Wallet Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 text-center">
          <p className="text-yellow-400">Please connect your wallet to interact with the contract</p>
        </div>
      )}

      {/* ETH Balance */}
      {isConnected && address && (
        <div className="bg-gray-800 rounded-lg p-4">
          <ETHBalance publicClient={publicClient as any} account={address} />
        </div>
      )}

      {/* Contract Interactions */}
      <div className="space-y-4">
        {/* Simple Increment */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Simple Operations</h4>
          <button
            onClick={handleIncrement}
            disabled={!isConnected || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {isLoading ? 'Processing...' : 'Increment (+1)'}
          </button>
        </div>

        {/* Number Input Operations */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Number Operations</h4>
          <div className="space-y-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={handleSetNumber}
                disabled={!isConnected || isLoading || !inputValue}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Set Number
              </button>
              <button
                onClick={handleAddNumber}
                disabled={!isConnected || isLoading || !inputValue}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Add Number
              </button>
              <button
                onClick={handleMulNumber}
                disabled={!isConnected || isLoading || !inputValue}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Multiply
              </button>
            </div>
          </div>
        </div>

        {/* Payable Function */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Payable Operation</h4>
          <div className="space-y-3">
            <input
              type="number"
              step="0.001"
              value={ethValue}
              onChange={(e) => setEthValue(e.target.value)}
              placeholder="ETH amount (e.g., 0.001)"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddFromMsgValue}
              disabled={!isConnected || isLoading || !ethValue}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Add ETH Value to Counter
            </button>
            <p className="text-sm text-gray-400">
              This will add the ETH amount (in wei) to the counter value
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Hash Display */}
      {txHash && (
        <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-2">Transaction Submitted</h4>
          <p className="text-sm text-gray-300 break-all">
            Hash: <span className="font-mono">{txHash}</span>
          </p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span className="text-blue-400">Processing transaction...</span>
          </div>
        </div>
      )}
    </div>
  );
}