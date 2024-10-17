const { ethers } = require("hardhat");

async function deploy_token() {
  const raisingToken = await ethers.getContractFactory("ERC20Mock");
  const raisingTokenInstance = await raisingToken.deploy("Wrapped BTC", "WBTC");
  await raisingTokenInstance.waitForDeployment();
  return raisingTokenInstance;
}
module.exports = deploy_token;
