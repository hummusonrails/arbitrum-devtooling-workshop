import { CONTRACT_ADDRESSES } from '../config/contracts';
import CounterAbi from '../abi/Counter.json';
import Counter from '../components/Counter';

const SOLIDITY_COUNTER_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.SOLIDITY_COUNTER;

const SolidityNFTPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Solidity Counter</h1>
        <p className="text-gray-300">Interact with your Solidity-based Counter on Arbitrum Stylus</p>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
        <Counter 
          key={SOLIDITY_COUNTER_CONTRACT_ADDRESS}
          contractAddress={SOLIDITY_COUNTER_CONTRACT_ADDRESS} 
          name="Solidity Counter"
          abi={CounterAbi}
        />
      </div>
      
      <div className="mt-8 p-6 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">About Solidity Counter</h2>
        <p className="text-gray-300">
          This is a standard Counter contract written in Solidity and deployed on the Arbitrum Stylus chain.
          Connect your wallet to interact with the counter.
        </p>
      </div>
    </div>
  );
};

export default SolidityNFTPage;