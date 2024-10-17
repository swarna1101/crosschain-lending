require("@nomicfoundation/hardhat-toolbox");
require("hardhat-tracer");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    amoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/2MnbiyVDOw4XCY8xJ6GvyARSuckHxVWY`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },

    sepo: {
      url: `https://eth-sepolia.g.alchemy.com/v2/2MnbiyVDOw4XCY8xJ6GvyARSuckHxVWY`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },

    bsc: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    taiko: {
      url: `https://rpc.hekla.taiko.xyz`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  tracer: {
    enabled: true,
  },
};
