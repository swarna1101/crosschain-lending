import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import "./Navbar.css";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [networkError, setNetworkError] = useState(false);

  // Updated network configuration
  const NETWORK_CHAIN_ID = "0x28c61"; // Hexadecimal for 167009 (Taiko Hekla L2)
  const NETWORK_NAME = "Taiko Hekla L2";
  const NETWORK_RPC_URL = "https://taiko-hekla.blockpi.network/v1/rpc/public";
  const NETWORK_NATIVE_CURRENCY = {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  };
  const NETWORK_BLOCK_EXPLORER_URL = "https://blockscoutapi.hekla.taiko.xyz";

  useEffect(() => {
    const initializeWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          window.localStorage.setItem("wallet:", accounts[0]);
          await checkNetwork();
        }
      }
    };

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setWalletAddress("");
        window.localStorage.setItem("wallet:", "");
      } else {
        setWalletAddress(accounts[0]);
        window.localStorage.setItem("wallet:", accounts[0]);
      }
    };

    const handleChainChanged = async () => {
      await checkNetwork();
      window.location.reload();
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    window.ethereum?.on("chainChanged", handleChainChanged);

    initializeWallet();

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setWalletAddress(account);
        window.localStorage.setItem("wallet:", accounts[0]);
        await checkNetwork();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== NETWORK_CHAIN_ID) {
        setNetworkError(true);
        await switchNetwork();
      } else {
        setNetworkError(false);
      }
    } catch (error) {
      console.error("Error checking network:", error);
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: NETWORK_CHAIN_ID,
                chainName: NETWORK_NAME,
                rpcUrls: [NETWORK_RPC_URL],
                nativeCurrency: NETWORK_NATIVE_CURRENCY,
                blockExplorerUrls: [NETWORK_BLOCK_EXPLORER_URL],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding network:", addError);
        }
      } else {
        console.error("Error switching network:", switchError);
      }
    }
  };

  const displayAddress = () => {
    if (walletAddress) {
      return (
        <span className="wallet-address">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
      );
    }
    return "Connect Wallet";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>TaikoLend</h1>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/pools">Pools</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {walletAddress ? (
          <div className="account-info">
            <span>Account: {displayAddress()}</span>
          </div>
        ) : (
          <button className="connect-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
