import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount} style={{
      appearance: 'button',
      backgroundColor: '#0276FF',
      borderRadius: '8px',
      borderStyle: 'none',
      boxShadow: 'rgba(255, 255, 255, 0.26) 0 1px 2px inset',
      boxSizing: 'border-box',
      color: '#fff',
      cursor: 'pointer',
      fontFamily: 'RM Neue, sans-serif',
      fontSize: '100%',
      lineHeight: '1.15',
      margin: 0,
      padding: '10px 21px',
      textTransform: 'none',
      transition: 'color .13s ease-in-out, background .13s ease-in-out, opacity .13s ease-in-out, box-shadow .13s ease-in-out',
     
      
    }}>Please connect your Metamask wallet</button>
   
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit} style={{margin:"10px", padding:"8px", fontSize: "20px", borderRadius:"8px",backgroundColor: '#0276FF',color: '#fff',borderStyle: 'none',
      boxShadow: 'rgba(255, 255, 255, 0.26) 0 1px 2px inset',}}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={{margin:"10px", padding:"8px", fontSize: "20px", borderRadius:"8px",backgroundColor: '#0276FF',color: '#fff',borderStyle: 'none',
      boxShadow: 'rgba(255, 255, 255, 0.26) 0 1px 2px inset', }}>Withdraw 1 ETH</button>
      </div>
    )
  }
  
 
  useEffect(() => {getWallet();}, []);
  
  return (
    
    <main className="container">
      <header><h1 style={{color: "white",
    backgroundColor: "DodgerBlue",
    background: "rgb(2,0,36)",
background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,83,121,1) 25%, rgba(0,212,255,1) 100%)",
    padding: "10px",
    fontFamily: "Arial"}}>Welcome to the ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center 
        }
      `}
      </style>
    </main>
  )
}