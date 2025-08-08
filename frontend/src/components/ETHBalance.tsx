// 💰 DEVTOOLING WORKSHOP: Reading Blockchain Data with viem
//
// This component demonstrates essential Web3 patterns:
// - Fetching wallet balance using publicClient
// - Handling bigint values from blockchain
// - Formatting wei to human-readable ETH
// - Implementing automatic refresh patterns
// - Managing component lifecycle with useEffect

import { useState, useEffect } from 'react';
import { WalletClient, PublicClient, formatEther } from 'viem';

// 📝 TASK 1: Understanding Component Props
// This component receives Web3 clients and account info as props
interface ETHBalanceProps {
  walletClient?: WalletClient;  // Not used here, but available for future features
  publicClient?: PublicClient;  // Used for reading blockchain data
  account?: string;            // Wallet address to check balance for
}

export default function ETHBalance({ publicClient, account }: ETHBalanceProps) {
  // 📊 TASK 2: State Management for Blockchain Data
  // TODO: Study why we use bigint instead of number for balance
  // HINT: Blockchain values are very large and need precise handling
  const [balance, setBalance] = useState<bigint>(0n);  // Wei balance as bigint

  // 🔄 TASK 3: useEffect for Data Fetching and Auto-Refresh
  // This demonstrates a common Web3 pattern: fetching data when dependencies change
  useEffect(() => {
    // 📖 TASK 4: Reading Wallet Balance from Blockchain
    // This function shows how to use publicClient to read blockchain data
    const fetchBalance = async () => {
      // Always validate that we have the required clients and data
      if (!publicClient || !account) return;
      
      try {
        // TODO: Study this viem getBalance call:
        // - Uses publicClient (no wallet needed for reading)
        // - Returns balance in wei (smallest ETH unit)
        // - Requires proper address typing
        const balance = await publicClient.getBalance({
          address: account as `0x${string}`  // Type assertion for viem's strict typing
        });
        
        // Store the raw wei balance (bigint)
        setBalance(balance);
      } catch (error) {
        console.error('Failed to fetch balance', error);
      }
    };

    // 🔄 TASK 5: Automatic Refresh Pattern
    // TODO: Study this pattern for keeping UI data fresh:
    // - Fetch immediately when component mounts or dependencies change
    // - Set up interval for periodic updates
    // - Clean up interval when component unmounts
    fetchBalance();  // Initial fetch
    const interval = setInterval(fetchBalance, 5000); // Update every 5 seconds
    
    // Cleanup function - very important to prevent memory leaks!
    return () => clearInterval(interval);
  }, [publicClient, account]);  // Re-run when these dependencies change

  // 🎨 TASK 6: Rendering Blockchain Data
  return (
    <div className="balance-container">
      {/* TODO: Study the address formatting pattern */}
      <h2>
        Balance {account && (
          <small className='text-gray-500 text-sm'>
            {account.slice(0, 6)}...{account.slice(-4)}  {/* Show first 6 and last 4 chars */}
          </small>
        )}
      </h2>
      
      {/* 💰 TASK 7: Wei to ETH Conversion */}
      {/* TODO: Study formatEther - converts wei (bigint) to human-readable ETH string */}
      <p className="balance-display">
        {formatEther(balance)} ETH  {/* formatEther handles the 18 decimal conversion */}
      </p>
    </div>
  );
}