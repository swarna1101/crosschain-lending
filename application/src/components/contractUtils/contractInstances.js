import { ethers } from "ethers";
import srcPoolAbi from "./abi/srcPool.json";
import dstPoolAbi from "./abi/dstPool.json";

// List of contract addresses
const srcPoolAddress = "";
const dstPoolAddress = "";

const createContractInstance = async (contractAddress, abi) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_RPC_URL
  );
  const wallet = new ethers.JsonRpcApiProvider(window.ethereum);
  return new ethers.Contract(contractAddress, abi, wallet);
};

// Function to get contract instances
export const getsrcContractInstance = () =>
  createContractInstance(srcPoolAddress, srcPoolAbi);
export const getdstContractInstance = () =>
  createContractInstance(dstPoolAddress, dstPoolAbi);
