/** @type import('hardhat/config').HardhatUserConfig */
// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 8001
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx`,
      accounts: [`0x5e3a4d6bd348b49743b5bee9c425170399fb870cb5ddd0f7af6fb1095cde4e2c`]
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx",
      accounts: [`0x5e3a4d6bd348b49743b5bee9c425170399fb870cb5ddd0f7af6fb1095cde4e2c`]
    },
    // goerli: {
    //   url: process.env.REACT_APP_ALCHEMY_API_URL,
    //   accounts: [ process.env.REACT_APP_PRIVATE_KEY ]
    // }
  },
  solidity: {
    solidity: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};


module.exports = {
  solidity: "0.8.17",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: "https://polygon-mumbai.g.alchemy.com/v2/QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx",
         accounts: [`0x5e3a4d6bd348b49743b5bee9c425170399fb870cb5ddd0f7af6fb1095cde4e2c`]
      }
   },
}

