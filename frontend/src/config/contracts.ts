// 📋 DEVTOOLING: Managing Contract Data
//
// This file demonstrates essential Web3 frontend patterns:
// - Centralizing contract addresses for easy management
// - Organizing contract ABIs for type safety
// - Creating reusable contract configurations
// - Using TypeScript for better developer experience
// - Managing multiple contract deployments

// 🏠 TASK 1: Contract Address Management
// TODO: Study this pattern for managing deployed contract addresses
// HINT: These addresses come from your deployment commands (cargo stylus deploy, forge create)
// HINT: Update these with your actual deployed contract addresses!
export const CONTRACT_ADDRESSES = {
  // TODO: Replace with your deployed Stylus contract address
  STYLUS_COUNTER: '0xf5ffd11a55afd39377411ab9856474d2a7cb697e',
  
  // TODO: Replace with your deployed Solidity contract address  
  SOLIDITY_COUNTER: '0x75E0E92A79880Bd81A69F72983D03c75e2B33dC8',
} as const;  // 'as const' makes this readonly and enables better TypeScript inference

// 📜 TASK 2: ABI Management Strategy
// TODO: Study how ABIs connect your frontend to smart contracts
// HINT: ABIs define the interface - what functions exist and their parameters
// HINT: Export ABIs from contracts using: cargo stylus export-abi
export const CONTRACT_ABIS = {
  // TODO: Add your contract ABIs here for type-safe contract calls
  // Example structure:
  // STYLUS_COUNTER: [
  //   {
  //     "type": "function",
  //     "name": "number",
  //     "inputs": [],
  //     "outputs": [{"type": "uint256"}]
  //   },
  //   // ... more ABI entries
  // ],
  // SOLIDITY_COUNTER: [...] // Same ABI since contracts are equivalent
} as const;

// 🏷️ TASK 3: Human-Readable Contract Names
// TODO: Study this mapping pattern for UI display
// HINT: Maps contract addresses to user-friendly names
// HINT: Uses computed property names with CONTRACT_ADDRESSES
export const CONTRACT_NAMES = {
  [CONTRACT_ADDRESSES.STYLUS_COUNTER]: 'Stylus Counter',    // Rust-based contract
  [CONTRACT_ADDRESSES.SOLIDITY_COUNTER]: 'Solidity Counter', // Solidity-based contract
} as const;

// 🔧 TASK 4: TypeScript Type Safety
// TODO: Study how this type helps with autocompletion and error checking
// HINT: This creates a union type of all contract address keys
export type ContractName = keyof typeof CONTRACT_NAMES;


// 🚀 NEXT STEPS:
// 1. Deploy your contracts using the CLI commands
// 2. Update CONTRACT_ADDRESSES with your deployed addresses
// 3. Export ABIs and add them to CONTRACT_ABIS
// 4. Use these configurations in your React components
// 5. Notice how both Stylus and Solidity contracts use the same ABI!