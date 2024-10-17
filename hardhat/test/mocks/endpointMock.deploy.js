const { ethers } = require("hardhat");

async function deploy_EndPoint(owner) {
  const eidA = 101;
  const eidB = 202;

  const mockEndPoint = await ethers.getContractFactory("EndpointV2Mock");
  const mockInstanceA = await mockEndPoint.deploy(eidA);
  const mockInstanceB = await mockEndPoint.deploy(eidB);
  await mockInstanceA.waitForDeployment();
  await mockInstanceB.waitForDeployment();
  return { mockInstanceA, mockInstanceB };
}
module.exports = deploy_EndPoint;
