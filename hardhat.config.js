require("@nomicfoundation/hardhat-toolbox");
// require('hardhat-abi-exporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    test: {
      url: "http://127.0.0.1:8545",
    }
  },
  // abiExporter: {
  //   path: './app/abi',
  //   runOnCompile: true,
  //   clear: true,
  //   flat: true,
  //   spacing: 2,
  // }
};
