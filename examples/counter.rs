//! Example on how to interact with a deployed `stylus-hello-world` contract using defaults.
//! This example uses alloy to instantiate the contract using a Solidity ABI.
//! Then, it attempts to check the current counter value, increment it via a tx,
//! and check the value again. The deployed contract is fully written in Rust and compiled to WASM
//! but with Stylus, it is accessible just as a normal Solidity smart contract is via an ABI.

use alloy::{
    network::EthereumWallet,
    primitives::Address,
    providers::ProviderBuilder,
    signers::local::PrivateKeySigner,
    sol,
};
use eyre::eyre;
use std::io::{BufRead, BufReader};

/// Your private key file path.
const PRIV_KEY_PATH: &str = "PRIV_KEY_PATH";

/// Stylus RPC endpoint url.
const RPC_URL: &str = "RPC_URL";

/// Deployed program address.
const STYLUS_CONTRACT_ADDRESS: &str = "STYLUS_CONTRACT_ADDRESS";

sol! {
    #[sol(rpc)]
    contract Counter {
        function number() external view returns (uint256);
        function setNumber(uint256 number) external;
        function increment() external;
    }
}

#[tokio::main]
async fn main() -> eyre::Result<()> {
    dotenv::dotenv().ok();
    let priv_key_path =
        std::env::var(PRIV_KEY_PATH).map_err(|_| eyre!("No {} env var set", PRIV_KEY_PATH))?;
    let rpc_url = std::env::var(RPC_URL).map_err(|_| eyre!("No {} env var set", RPC_URL))?;
    let contract_address = std::env::var(STYLUS_CONTRACT_ADDRESS)
        .map_err(|_| eyre!("No {} env var set", STYLUS_CONTRACT_ADDRESS))?;

    let address: Address = contract_address.parse()?;

    let privkey = read_secret_from_file(&priv_key_path)?;
    let signer: PrivateKeySigner = privkey.parse()?;
    let wallet = EthereumWallet::from(signer);

    let provider = ProviderBuilder::new()
        .wallet(wallet)
        .on_http(rpc_url.parse()?);

    let counter = Counter::new(address, &provider);

    let num = counter.number().call().await?;
    println!("Counter number value = {:?}", num._0);

    let tx = counter.increment().send().await?;
    let receipt = tx.get_receipt().await?;
    println!("Receipt = {:?}", receipt);
    println!("Successfully incremented counter via a tx");

    let num = counter.number().call().await?;
    println!("New counter number value = {:?}", num._0);
    Ok(())
}

fn read_secret_from_file(fpath: &str) -> eyre::Result<String> {
    let f = std::fs::File::open(fpath)?;
    let mut buf_reader = BufReader::new(f);
    let mut secret = String::new();
    buf_reader.read_line(&mut secret)?;
    Ok(secret.trim().to_string())
}
