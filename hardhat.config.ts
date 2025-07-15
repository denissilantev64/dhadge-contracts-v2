import dotenv from "dotenv";
import "@nomicfoundation/hardhat-foundry";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-waffle";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "hardhat-abi-exporter";
import "solidity-coverage";
import "@typechain/hardhat";
import "hardhat-contract-sizer";

import "./deployment/upgrade/upgrade";
import "./deployment/checks/checkConfig";
import "./deployment/compileOne";
import "./deployment/polygon/dynamicBonds";
import "./deployment/polygon/privateTokenSwap";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  gasReporter: {
    enabled: true,
    currency: "ETH",
    showTimeSpent: true,
  },
  networks: {
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
      timeout: 0,
    },
    ethereum: {
      chainId: 1,
      url: process.env.ETHEREUM_URL || "https://eth-mainnet.g.alchemy.com/v2/",
      accounts: process.env.ETHEREUM_PRIVATE_KEY ? [process.env.ETHEREUM_PRIVATE_KEY] : [],
    },
    ovm: {
      chainId: 10,
      url: process.env.OPTIMISM_URL || "https://opt-mainnet.g.alchemy.com/v2/",
      accounts: process.env.OVM_PRIVATE_KEY ? [process.env.OVM_PRIVATE_KEY] : [],
    },
    polygon: {
      chainId: 137,
      url: process.env.POLYGON_URL || "https://polygon-mainnet.g.alchemy.com/v2/",
      accounts: process.env.POLYGON_PRIVATE_KEY ? [process.env.POLYGON_PRIVATE_KEY] : [],
      gasPrice: 400e9,
      timeout: 600000,
    },
    arbitrum: {
      chainId: 42161,
      url: process.env.ARBITRUM_URL || "https://arb-mainnet.g.alchemy.com/v2/",
      accounts: process.env.ARBITRUM_PRIVATE_KEY ? [process.env.ARBITRUM_PRIVATE_KEY] : [],
    },
    base: {
      chainId: 8453,
      url: process.env.BASE_URL || "https://base-mainnet.g.alchemy.com/v2/",
      accounts: process.env.BASE_PRIVATE_KEY ? [process.env.BASE_PRIVATE_KEY] : [],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
          optimizer: {
            enabled: true,
            runs: 20,
          },
        },
      },
      {
        version: "0.8.10",
        settings: {
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
          optimizer: {
            enabled: true,
            runs: 20,
          },
        },
      },
      {
        version: "0.8.28",
        settings: {
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
          optimizer: {
            enabled: true,
            runs: 20,
          },
        },
      },
    ],
    overrides: {
      "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol": {
        version: "0.7.6",
      },
    },
  },
  mocha: {
    timeout: 0,
    retries: 0,
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    flat: true,
    only: [
      "PoolFactory",
      "PoolLogic",
      "PoolManagerLogic",
      "AssetHandler",
      "DynamicBonds",
      "DhedgeStakingV2",
      "DhedgeEasySwapper",
      "RewardDistribution",
      "Governance",
      "contracts/swappers/poolTokenSwapper/PoolTokenSwapper",
      "contracts/swappers/easySwapperV2/EasySwapperV2",
      "PoolLimitOrderManager",
    ],
    except: ["contracts/interfaces", "contracts/test", "contracts/v2.4.1", "contracts/stakingv2/interfaces"],
    spacing: 2,
  },
  etherscan: {
    // https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html#multiple-api-keys-and-alternative-block-explorers
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "./types",
    target: "ethers-v5",
  },
};

// Hack console to just print bigNumbers as normal numbers not as an object
const log = console.log.bind(console);
console.log = (...args) => {
  args = args.map((arg) => {
    if (arg && arg._isBigNumber) {
      return arg.toString();
    }
    return arg;
  });
  log(...args);
};
