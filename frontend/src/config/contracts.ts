// Contract addresses
export const CONTRACT_ADDRESSES = {
    STYLUS_COUNTER: '0xf5ffd11a55afd39377411ab9856474d2a7cb697e',
    SOLIDITY_COUNTER: '0x75E0E92A79880Bd81A69F72983D03c75e2B33dC8',
  } as const;
  
  // Contract ABIs (if needed in the future)
  export const CONTRACT_ABIS = {
    // Add ABIs here when needed
  } as const;
  
  // Contract names for UI display
  export const CONTRACT_NAMES = {
    [CONTRACT_ADDRESSES.STYLUS_COUNTER]: 'Stylus Counter',
    [CONTRACT_ADDRESSES.SOLIDITY_COUNTER]: 'Solidity Counter',
  } as const;
  
  export type ContractName = keyof typeof CONTRACT_NAMES;