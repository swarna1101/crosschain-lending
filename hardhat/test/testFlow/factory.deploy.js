const { ethers } = require("hardhat");

async function deploy_factory() {
  const srcfactory = await ethers.getContractFactory("PoolSrcFactory");
  const dstfactory = await ethers.getContractFactory("PoolDstFactory");

  const srcfactoryInstance = await srcfactory.deploy();
  await srcfactoryInstance.waitForDeployment();

  const dstfactoryInstance = await dstfactory.deploy();
  await dstfactoryInstance.waitForDeployment();

  return { srcfactoryInstance, dstfactoryInstance };
}
module.exports = deploy_factory;
