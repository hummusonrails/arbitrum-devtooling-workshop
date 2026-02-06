import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StylusCounterPage from './pages/StylusCounterPage';
import SolidityCounterPage from './pages/SolidityCounterPage';
import { Web3Provider } from './contexts/Web3Context';
import Layout from './components/Layout';
import Footer from './components/Footer';

// Import contract constants
import { CONTRACT_ADDRESSES } from './config/contracts';

export const {
  STYLUS_COUNTER: STYLUS_COUNTER_CONTRACT_ADDRESS,
  SOLIDITY_COUNTER: SOLIDITY_COUNTER_CONTRACT_ADDRESS,
} = CONTRACT_ADDRESSES;

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<StylusCounterPage />} />
            <Route path="stylus-counter" element={<StylusCounterPage />} />
            <Route path="solidity-counter" element={<SolidityCounterPage />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </Web3Provider>
  );
};

export default App;