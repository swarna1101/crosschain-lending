const { ethers } = require("hardhat");

const {
  abi: FACTORY_ABI,
  bytecode: FACTORY_BYTECODE,
} = require("@uniswap/v2-core/build/UniswapV2Factory.json");

const {
  abi: WETH9_ABI,
  bytecode: WETH9_BYTECODE,
} = require("@uniswap/v2-periphery/build/WETH9.json");

const {
  abi: ROUTER_ABI,
  bytecode: ROUTER_BYTECODE,
} = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");

async function main() {
  // Get the deployer
  const [deployer] = await ethers.getSigners();

  // Deploy Uniswap V2 Factory
  const Factory = new ethers.ContractFactory(
    FACTORY_ABI,
    FACTORY_BYTECODE,
    deployer
  );

  const factory = await Factory.deploy(deployer.address);
  await factory.waitForDeployment();
  console.log("UniswapV2Factory deployed to:", factory.target);

  // Deploy WETH (or another wrapped token for the pair)
  const WETH = new ethers.ContractFactory(WETH9_ABI, WETH9_BYTECODE, deployer);

  const weth = await WETH.deploy();
  await weth.waitForDeployment();
  console.log("WETH deployed to:", weth.target);

  // Deploy Uniswap V2 Router
  const Router = new ethers.ContractFactory(
    ROUTER_ABI,
    ROUTER_BYTECODE,
    deployer
  );

  const router = await Router.deploy(factory.target, weth.target);
  await router.waitForDeployment();
  console.log("UniswapV2Router02 deployed to:", router.target);

  // Deploy ERC20 Token A
  const ERC20 = await ethers.getContractFactory("ERC20Mock");
  const tokenA = await ERC20.deploy("TokenA", "A");
  await tokenA.waitForDeployment();
  console.log("Token A deployed to:", tokenA.target);

  // Deploy ERC20 Token B
  const tokenB = await ERC20.deploy("TokenB", "B");
  await tokenB.waitForDeployment();
  console.log("Token B deployed to:", tokenB.target);

  // Create a pair on Uniswap V2 Factory
  const tx = await factory.createPair(tokenA.target, tokenB.target);
  const pairAddress = await factory.getPair(tokenA.target, tokenB.target);
  console.log("Pair deployed to:", pairAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
