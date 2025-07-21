import { CONTRACT_ADDRESSES } from '../config/contracts';
import CounterAbi from '../abi/Counter.json';
import Counter from '../components/Counter';

const STYLUS_COUNTER_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.STYLUS_COUNTER;

const StylusCounterPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Stylus Counter</h1>
        <p className="text-gray-300">Interact with your Stylus-based Counter on Arbitrum Stylus</p>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
        <Counter 
          key={STYLUS_COUNTER_CONTRACT_ADDRESS}
          contractAddress={STYLUS_COUNTER_CONTRACT_ADDRESS} 
          name="Stylus Counter"
          abi={CounterAbi}
        />
      </div>
      
      <div className="mt-8 p-6 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">About Stylus Counter</h2>
        <p className="text-gray-300">
          This is a standard Counter contract written in Rust and deployed on the Arbitrum Stylus chain.
          Connect your wallet to interact with the counter.
        </p>
      </div>
    </div>
  );
};

export default StylusCounterPage;