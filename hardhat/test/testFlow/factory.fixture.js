const { ethers } = require("hardhat");
const hre = require("hardhat");
const deploy_factory = require("./factory.deploy");
const deploy_EndPoint = require("../mocks/endpointMock.deploy");
const deploy_token = require("../mocks/erc20Mock.deploy");

async function factoryFixture() {
  const [owner, msgsender1, msgsender2] = await ethers.getSigners();
  const { mockInstanceA, mockInstanceB } = await deploy_EndPoint();

  const eidA = 101;
  const eidB = 202;

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

  const tokenOnChainA = await deploy_token();
  const tokenOnChainB = await deploy_token();

  //************************************************** */
  //************************************************** */
  //*****************DST POOL A****************** */
  //************************************************** */
  //************************************************** */
  //************************************************** */

  // deploy SRC & DST contracts on both chains using factory instances
  await dstfactoryInstance1.deployDstPool(
    mockInstanceA.target,
    owner.address,
    tokenOnChainA.target,
    eidB
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

  //************************************************** */
  //************************************************** */
  //*****************SRC POOL B****************** */
  //************************************************** */
  //************************************************** */
  //************************************************** */

  await srcfactoryInstance2.deploySrcPool(
    mockInstanceB.target,
    owner.address,
    eidA,
    dstPoolInstanceA.target,
    tokenOnChainB.target,
    tokenOnChainB.target, // MOCK oracle token placeholder
    [1, 2], // oracle prices index
    tokenOnChainA.target,
    60,
    5,
    100
  );

  const srcPoolB = await srcfactoryInstance2.allSrcPools(0);
  const srcPoolArtifacts = await hre.artifacts.readArtifact("SrcPool");
  const srcContractFactoryB = new ethers.ContractFactory(
    srcPoolArtifacts.abi,
    srcPoolArtifacts.bytecode,
    owner // Signer account
  );

  const srcPoolInstanceB = srcContractFactoryB.attach(srcPoolB);

  // connecting the lzEndpoints

  await mockInstanceA.setDestLzEndpoint(
    srcPoolInstanceB.target,
    mockInstanceB.target
  );

  await mockInstanceB.setDestLzEndpoint(
    dstPoolInstanceA.target,
    mockInstanceA.target
  );

  await dstPoolInstanceA
    .connect(owner)
    .setPeer(eidB, ethers.zeroPadValue(srcPoolInstanceB.target, 32));
  await srcPoolInstanceB
    .connect(owner)
    .setPeer(eidA, ethers.zeroPadValue(dstPoolInstanceA.target, 32));

  return {
    // srcfactoryInstance1,
    srcfactoryInstance2,
    dstfactoryInstance1,
    // dstfactoryInstance2,
    tokenOnChainA,
    tokenOnChainB,
    mockInstanceA,
    mockInstanceB,
    owner,
    dstPoolInstanceA,
    srcPoolInstanceB,
  };
}

module.exports = {
  factoryFixture,
};
