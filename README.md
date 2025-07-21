# 🛠️ Arbitrum Devtooling Workshop

> [!NOTE]
> Learn the essentials of developer tooling on Arbitrum using both Solidity and Stylus (Rust), and connect them to a modern frontend. All in a preconfigured Codespace!

| Learning Outcomes |
|---|
| Understand the Arbitrum Nitro Devnode local environment |
| Deploy and interact with Stylus (Rust) and Solidity contracts |
| Use cargo stylus, foundry (forge/cast), and viem + wagmi |
| Connect contracts to a React + Vite + TypeScript frontend |
| Practice ABI export/import and contract method wiring |

## Quick Start (GitHub Codespaces)

Run the workshop in a preconfigured Codespace — no setup required!

[![Open in Codespaces](https://img.shields.io/badge/Open%20in-GitHub%20Codespaces-blue?logo=github&logoColor=white&style=for-the-badge)](https://codespaces.new/hummusonrails/arbitrum-devtooling-workshop)

**Steps:**
1. Click the button above.
2. Wait for initialization.
3. Open a terminal (Terminal → New Terminal).
4. Follow the workshop steps below.

## What You’ll Do

- ✅ Set up a local Arbitrum Nitro Devnode
- ✅ Deploy and interact with Stylus (Rust) and Solidity contracts
- ✅ Use cargo stylus, foundry (forge/cast), and viem + wagmi
- ✅ Connect contracts to a React + Vite + TypeScript frontend
- ✅ Practice ABI export/import and contract method wiring
- ✅ Experience with core Arbitrum developer tools

## Local Requirements (Skip if using Codespaces)

For running locally:
- [pnpm](https://pnpm.io/installation)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [rust](https://rustup.rs/)
- [foundry](https://book.getfoundry.sh/getting-started/installation)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Nitro-devnode](https://github.com/OffchainLabs/nitro-devnode?tab=readme-ov-file#usage)

## Project Structure Overview

```bash
apps/
├── frontend              # React + Vite + TS frontend
├── contracts-stylus      # Stylus (Rust) Counter contract
├── contracts-solidity    # Solidity Counter contract
├── nitro-devnode         # Local Arbitrum node
scripts/
├── fund.sh               # Fund test accounts
└── ...                   # Other helper scripts
```

## Workshop Exercises

### 1. Install Dependencies

```bash
pnpm install -r
```

### 2. Run Nitro Devnode

> [!NOTE]
> Codespaces users: This is mostly handled for you, but you still need to manually start the devnode inside the correct directory.

```bash
cd apps/nitro-devnode
./run-dev-node.sh
```

### 3. Build & Deploy Stylus Counter Contract

* Stylus contract code is provided in `apps/contracts-stylus/counter/src/lib.rs`.
* Build and deploy locally:

```bash
pnpm --filter contracts-stylus build
pnpm --filter contracts-stylus deploy:local
```
* Copy the deployed contract address for later use.

### 4. Build & Deploy Solidity Counter Contract

* Solidity contract code is provided in `apps/contracts-solidity/counter/contracts/Counter.sol`.
* Build and deploy locally:

```bash
pnpm --filter contracts-solidity build
pnpm --filter contracts-solidity deploy:local
```
* Copy the deployed contract address for later use.

### 5. Export Stylus Contract ABI

* Use cargo stylus to export the ABI:

```bash
cd apps/contracts-stylus
cargo stylus export-abi --json > ../../frontend/src/abi/CounterStylus.json
```

* Open the exported ABI file and make sure it only includes the ABI in JSON format and no extra metadata.

### 6. Connect Frontend to Contracts

* The frontend is in `apps/frontend`.
* Update the config file (e.g., `apps/frontend/src/config/contracts.ts`):

```ts
export const CONTRACT_ADDRESSES = {
  STYLUS_COUNTER: '0x...',
  SOLIDITY_COUNTER: '0x...',
} as const;
```

### 7. Implement Contract Interactions (Frontend Exercise)

> The UI is provided, but you must implement the contract method calls!

- Use [viem](https://viem.sh/) and [wagmi](https://wagmi.sh/) to wire up the increment and read methods for both contracts.
- Switch between contracts using the menu bar.
- See `apps/frontend/src/components/Counter.tsx` for where to add your logic.

### 8. Start the Frontend

```bash
pnpm --filter frontend dev
```

### 9. Test Accounts & Funding

**Deployer Account:**
* Address: `0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E`
* Private Key: `0xb6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659`

**Test Users:**

| Index  | Address | Private Key |
| ------------- | ------------- | ----------- |
| 0  | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 |
| 1  | 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d |
| 2  | 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a |
| 3  | 0x90F79bf6EB2c4f870365E785982E1f101E93b906 | 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6 |
| 4  | 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 | 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a |
| 5  | 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc | 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba |
| 6  | 0x976EA74026E726554dB657fA54763abd0C3a0aa9 | 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e |
| 7  | 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 | 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356 |
| 8  | 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f | 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97 |
| 9  | 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 | 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 |

**Fund User Wallets:**

```bash
./scripts/fund.sh
```

### 10. Testing Contracts

```bash
pnpm --filter contracts-stylus test
pnpm --filter contracts-solidity test
```

## Network Settings

**Local Network:**
- Name: Localhost-Nitro
- RPC: http://localhost:8547
- Chain ID: 412346

**Codespaces RPC:**
- Use the forwarded port URL from the "Ports" tab (e.g., `https://your-codespace-8547.app.github.dev`)

## 🧑‍💻 Workshop Tips

- Use separate wallets for deployment and user interaction.
- Refer to the provided scripts and configs for examples.
- Ask questions and experiment with the tooling!

Happy hacking!
