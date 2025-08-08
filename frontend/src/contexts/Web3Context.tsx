// 🔗 DEVTOOLING WORKSHOP: Wallet Connection & viem Clients
//
// This context demonstrates essential Web3 patterns:
// - Setting up viem clients for reading and writing to blockchain
// - Managing wallet connection state across the application
// - Handling different client types (public vs wallet)
// - Working with browser wallet providers (MetaMask, etc.)

import React, { createContext, ReactNode, useState, useContext } from 'react';
import { createPublicClient, createWalletClient, custom } from 'viem';
import { localhost } from '../constants';

// 📝 TASK 1: Understanding the Web3 Context Interface
// This interface defines what our Web3 context will provide to components
interface Web3ContextType {
  // TODO: Study these two client types - what's the difference?
  publicClient: ReturnType<typeof createPublicClient> | null;  // For reading blockchain data
  walletClient: ReturnType<typeof createWalletClient> | null;  // For sending transactions
  
  // Wallet connection state
  address: string | null;      // Connected wallet address
  chainId: number | null;      // Current blockchain network ID
  
  // Connection management functions
  connect: () => Promise<void>;    // Connect to user's wallet
  disconnect: () => void;          // Disconnect from wallet
  isConnected: boolean;            // Connection status
}

// Create the context with default values
const Web3Context = createContext<Web3ContextType>({
  publicClient: null,
  walletClient: null,
  address: null,
  chainId: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
});

// 🪝 Custom hook to use the Web3 context in components
export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [publicClient, setPublicClient] = useState<ReturnType<typeof createPublicClient> | null>(null);
  const [walletClient, setWalletClient] = useState<ReturnType<typeof createWalletClient> | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connect = async () => {
    if (!(window as any).ethereum) {
      alert('No injected wallet found. Please install MetaMask or another wallet.');
      return;
    }
    try {
      // Get the current chainId from the wallet
      const chainIdHex = await (window as any).ethereum.request({ method: 'eth_chainId' });
      const chainId = Number(chainIdHex);
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const newAddress = accounts[0];
      const walletClient = createWalletClient({
        chain: localhost,
        transport: custom((window as any).ethereum),
        account: newAddress as `0x${string}`
      });
      const publicClient = createPublicClient({
        chain: localhost,
        transport: custom((window as any).ethereum),
      });
      setWalletClient(walletClient);
      setPublicClient(publicClient);
      setAddress(newAddress);
      setChainId(chainId);
      setIsConnected(true);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setWalletClient(null);
    setPublicClient(null);
    setChainId(null);
  };

  // Debug logs for context propagation
  React.useEffect(() => {
    console.log('[Web3Provider] Context updated', { publicClient, walletClient, address, chainId, isConnected });
  }, [publicClient, walletClient, address, chainId, isConnected]);

  return (
    <Web3Context.Provider value={{ publicClient, walletClient, address, chainId, connect, disconnect, isConnected }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;