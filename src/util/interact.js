// require("dotenv").config();
const alchemyKey = "7Z70htLxzC33FHNzbQEf19QssuwQQJ3M"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
export const web3 = createAlchemyWeb3("wss://polygon-mumbai.g.alchemy.com/v2/QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx");
const contractAddress = "0x2bfb57b3ba0dcfa030ed01956df85c37d40cf87f";
const contractAddress1 = "0x3e9ce30d57425b2f29332d2f2c6700f7a9a6f75f";




export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "true",
        };
      } else {
        return {
          address: "",
          status: "false",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

