const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { factoryFixture } = require("./factory.fixture");
const { Options } = require("@layerzerolabs/lz-v2-utilities");

describe("Taiko Lending", () => {
  beforeEach(async () => {
    ({
      // srcfactoryInstance1,
      srcfactoryInstance2,
      dstfactoryInstance1,
      //  dstfactoryInstance2,
      tokenOnChainA,
      tokenOnChainB,
      mockInstanceA,
      mockInstanceB,
      owner,
      dstPoolInstanceA,
      srcPoolInstanceB,
    } = await loadFixture(factoryFixture));
  });

  it("Should create a pool, set the peers, deposit collateral & taken loan on other chain", async () => {
    // deposit some collateral
    // get loan on other chain
    // perform it for the mainnet via script

    // minting & approval of the token to the dstPool
    await tokenOnChainA.mint(owner.address);
    await tokenOnChainA.approve(
      dstPoolInstanceA.target,
      ethers.parseEther("65000")
    );
    await tokenOnChainB.mint(owner.address);
    await tokenOnChainB.approve(
      srcPoolInstanceB.target,
      ethers.parseEther("65000")
    );
    await srcPoolInstanceB.deposit(ethers.parseEther("65000"));

    const options = Options.newOptions()
      .addExecutorLzReceiveOption(20000000, 0)
      .toHex()
      .toString();

    await dstPoolInstanceA
      .connect(owner)
      .takeLoan(ethers.parseUnits("32500", 6), options, {
        value: "221006424000000000",
      });

    ///////////// REPAY LOAN //////////////////
    const balance = await tokenOnChainB.balanceOf(owner.address);
    await tokenOnChainB.connect(owner).approve(srcPoolInstanceB, balance);
    await srcPoolInstanceB.connect(owner).repayLoan(options, {
      value: "221006424000000000",
    });
  });
});
