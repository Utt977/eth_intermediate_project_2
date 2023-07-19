# ATM Application

This is a simple ATM (Automated Teller Machine) application built using React, Ethereum, and MetaMask. The application allows users to connect their MetaMask wallet, check their account balance, and perform transactions like depositing and withdrawing ETH.

## Prerequisites

Before running the application, make sure you have the following installed:

- MetaMask: Install the MetaMask browser extension to connect your Ethereum wallet.
- Remix: Access the Remix online Solidity IDE for compiling and deploying smart contracts.

## Setup

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.


## Smart Contract

The smart contract used in this application is deployed on the Ethereum blockchain. The contract address and ABI (Application Binary Interface) are defined in the `atm_abi` file. You can access the contract source code in the `Assessment.sol` file.

## Usage

1. Open the application in your web browser.
2. Connect your MetaMask wallet by clicking the "Connect" button. Make sure you have MetaMask installed and a valid Ethereum account.
3. Once connected, your account address and balance will be displayed.
4. Click the "Deposit 1 ETH" button to deposit 1 ETH into your account. The transaction will be processed and the balance will be updated.
5. Click the "Withdraw 1 ETH" button to withdraw 1 ETH from your account. The transaction will be processed and the balance will be updated.

## Troubleshooting

- If MetaMask is not installed, you will be prompted to install it. Please install MetaMask and then refresh the page.
- If you encounter any issues with transactions or balance updates, ensure that you are connected to a supported Ethereum network (e.g., Rinkeby, Ropsten, etc.) in MetaMask.

## Limitations

- This application is for demonstration purposes only and should not be used with real funds.
- The smart contract used in the application is a simplified version and may not have all the necessary security features for a production environment.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.


