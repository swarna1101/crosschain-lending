const { ethers } = require("hardhat");
const deploy_factory = require("./deploy/factory.deploy");
const usdt_token = require("./deploy/usdt.deploy");
const weth_token = require("./deploy/weth.deploy");

const { Options } = require("@layerzerolabs/lz-v2-utilities");

async function main() {
  const [owner] = await ethers.getSigners();

  const taikoTestnetEID = 40274; // eidA
  const polytestnetEID = 40267; //eidB

  const lzEndpointA = "0x6EDCE65403992e310A62460808c4b910D972f10f";
  const lzEndpointB = "0x6EDCE65403992e310A62460808c4b910D972f10f";

  // lzEndpointA on this chain
  const {
    // srcfactoryInstance: srcfactoryInstance1,
    dstfactoryInstance: dstfactoryInstance1,
  } = await deploy_factory();

  // lzEndpointB on this chain
  const {
    srcfactoryInstance: srcfactoryInstance2,
    // dstfactoryInstance: dstfactoryInstance2,
  } = await deploy_factory();

  const tokenOnChainA = await usdt_token();
  const tokenOnChainB = await weth_token();

  // deploy SRC & DST contracts on both chains using factory instances
  await dstfactoryInstance1.deployDstPool(
    lzEndpointA,
    owner.address,
    tokenOnChainA.target,
    polytestnetEID
  );

  // getting the destination pool by hardcoding
  const dstPoolA = await dstfactoryInstance1.allDstPools(0);
  const dstPoolAArtifacts = await hre.artifacts.readArtifact("DstPool");
  const destContractFactoryA = new ethers.ContractFactory(
    dstPoolAArtifacts.abi,
    dstPoolAArtifacts.bytecode,
    owner // Signer account
  );

  const dstPoolInstanceA = destContractFactoryA.attach(dstPoolA);

  const srcPoolB = await srcfactoryInstance2.allSrcPools(0);
  const srcPoolArtifacts = await hre.artifacts.readArtifact("SrcPool");
  const srcContractFactoryB = new ethers.ContractFactory(
    srcPoolArtifacts.abi,
    srcPoolArtifacts.bytecode,
    owner // Signer account
  );

  const srcPoolInstanceB = srcContractFactoryB.attach(srcPoolB);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
