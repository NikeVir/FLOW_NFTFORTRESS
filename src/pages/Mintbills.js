import { React, useState, useEffect } from 'react'
import { uploadFileToIPFS, uploadJSONToIPFS } from '../util/upload';
import mintABI from '../NftMintABI.json'
import Web3Modal from "web3modal";
import { Alchemy, Network } from 'alchemy-sdk';
import upload_img from "./upload.png";
import '../Styles/Mintbills.css'
import Modal from 'react-bootstrap/Modal';
import { ScaleLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {
  connectWallet,
  getCurrentWalletConnected
} from '../util/interact';
import Pagination from 'react-bootstrap/Pagination';
import {ethers} from 'ethers'

export default function Mintbills() {
  const [walletAddress, setWallet] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tarr, setTarr] = useState([])
  const [navbar, setNavbar] = useState("mint")
  const [status,setStatus] =useState("")


  useEffect(() => {
    const checkwallet = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
    }
    checkwallet();
  }, []);








  var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      let contract = new ethers.Contract("0x99886c348895FD97fFAFb968E1e3A022368a1039", mintABI, signer)
      handleShow()
      console.log(walletAddress)
      // let checkseller = await contract.isMember(parseInt(e.target.org.value),walletAddress)
      // if(!checkseller){
      //   setStatus("nr")
      //   return;
      // }
      setStatus("upd")

      const image = e.target.image.files[0];
      const name = e.target.name.value;
      const tokenId = 1;
      var res = await uploadFileToIPFS(image, name, tokenId);

      const register = {
        "name": name,
        "tokenid": tokenId,
        "image": res.pinataURL,
        "description": e.target.desc.value,
        "symbol": "NFTFORTRESS",
        "attributes": [
          {
            "trait_type": "warrentyPeriod",
            "value": e.target.warrentyPeriod.value
          },
          {
            "trait_type": "productId",
            "value": e.target.productId.value
          },
          {
            "trait_type": "date",
            "value": e.target.date.value,
          },
          {
            "trait_type": "location",
            "value": e.target.location.value,
          },
          {
            "trait_type": "price",
            "value": e.target.price.value,
          },
          {
            "trait_type": "mintername",
            "value": e.target.mintername.value,
          }
          ,{
            "trait_type": "Organization ID",
            "value": e.target.org.value,
          }
        ]
      }
      console.log(JSON.stringify(register))
      const response = await uploadJSONToIPFS(register);
      console.log("Uploaded JSON to Pinata: ", response)
      if (response.success === false) {
        return "Failed";
      }
      setStatus("tsn")

      let transaction = await contract.safeMint(e.target.address.value, response.pinataURL)
      await transaction.wait()
      setStatus("true")

    }
    catch (err) {
      console.log(err)
      setStatus("failed")
    }


  }
  var alchemysettings = {
    apiKey: "QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx",
    network: Network.MATIC_MUMBAI,
  }








  const getTransaction = async () => {
    const alchemy = new Alchemy(alchemysettings);
    const Transfers = await alchemy.core.getAssetTransfers({
      toAddress: walletAddress,
      contractAddresses: ["0x99886c348895FD97fFAFb968E1e3A022368a1039"],
      category: ["erc721"],
    });
    setTarr(Transfers.transfers)
    console.log(Transfers)
  }


  const setnavbar = (s) => {
    if (s == "trans") {
      setNavbar("trans");
      if (tarr.length == 0) {
        getTransaction();
      }
    }
    else {
      setNavbar(s)
    }
  }



  const OnconnectWallet = async () => {
    const walletResponse = await connectWallet();
    console.log(walletResponse)
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  }
  return (
    <>
      <div className='mint_body'>
        <div className="top-rectanglee">
          <h1>NFTFORTRESS</h1>
          <div>
            <span className='transact' onClick={() => setnavbar("trans")}>See All Transaction</span>
            <span className='transact' onClick={() => setnavbar("mint")}>MINT</span>
            <span className='walletad' onClick={OnconnectWallet}>{walletAddress == '' ? "Connect Wallet" : (walletAddress.substring(0, 6) +
              "..." +
              walletAddress.substring(38))}</span>
          </div>

        </div>
        <div className="page-container">


          {
            navbar == 'mint' ? (
              <div className="mint-box">

                <h2>Mint your NFT</h2>
                <form onSubmit={handlesubmit}>
                  <div className="mint-form">

                    <div className="left-form">
                      <p style={{  margin: "11px", fontWeight: "bold" }}>
                        Upload
                      </p>
                      <div className="uploado">
                        <div className="upload-box">

                          <div className="nft-image">
                            <p className="no-margin">
                              <input
                                type="file"
                                accept="image/*"
                                name="image"
                                id="file"
                                required
                                onChange={(event) => {
                                  loadFile(event);
                                }}
                                style={{ display: "none" }}
                              />
                              <div>
                                <label htmlFor="file" style={{ cursor: "pointer" }}>
                                  <div className="upload-box">
                                    <img
                                      id="output"
                                      style={{
                                        minHeight: "50px",
                                        maxHeight: "300px",
                                        minWidth: "50px",
                                        maxWidth: "300px"
                                      }}
                                      src='/pngegg.png'
                                      alt=""
                                    />
                                  </div>
                                </label>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="imp">
                        <div className="form-input">
                          <label htmlFor="productid">Product ID:</label>
                          <input name="productId" type="text" id="productid" />
                        </div>

                        <div className="form-input">
                          <label htmlFor="name">Minter Name:</label>
                          <input name="mintername" type="text" id="name" />
                        </div>
                        <div className="form-input">
                        <label htmlFor="name">Reciever Address: </label>
                        <input name="address" type="text" id="name" />
                      </div>

                      </div>
                    </div>
                    <div className="right-form">
                      <div className="form-input">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="name" id="title" />
                      </div>
                      <div className="form-input">
                        <label htmlFor="title">Price:</label>
                        <input type="text" name="price" id="title" />
                      </div>
                      <div className="form-input" style={{ marginBottom: "5px", marginTop: "15px" }}>
                        <label htmlFor="description">Description:</label>
                        <textarea name='desc' id="description"></textarea>
                      </div>

                      <div className="form-input">
                        <p>Warranty Period:</p>
                        <input name="warrentyPeriod" type="date" />
                      </div>

                      <div className="form-input">
                        <p>Date:</p>
                        <input name="date" type="date" id="date" />
                      </div>
                      <div className="form-input" style={{ marginBottom: "2%" }}>
                        <label htmlFor="location">Location:</label>
                        <input type="text" name="location" id="location" />
                      </div>
                     
                      <div className="form-input">
                        <label htmlFor="name">Organization ID:</label>
                        <input name="org" type="text" id="name" />
                      </div>
                    </div>
                  </div>
                  <button type='submit' className="mint-button">Mint</button>

                  <div className="concluding-text">
                    {/* <p style={{ marginTop: "0%", fontSize: "12px", color: "grey" }}>
                      By minting this NFT, you certify that you are the rightful owner of
                      the content and have the legal right to mint and sell it as an NFT.
                    </p> */}
                  </div>
                </form>

              </div>

            ) : (
              <div className="mint-box">
                Transaction
                {/* <button onClick={getTransaction}>get transaction</button> */}

                <table>
                  <thead>
                    <tr>
                      <th scope="col">S no</th>
                      <th scope="col">Block Number</th>
                      <th scope="col">Token Id</th>
                      <th scope="col">Customer Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tarr.length == 0 ? ("") : (

                        tarr.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className='leaderboard_td1' >{index + 1}</td>
                              <td className='leaderboard_td2'>{item.blockNum}</td>
                              <td className='leaderboard_td3'>{item.tokenId.substring(60)}</td>
                              <td className='leaderboard_td3'>{item.to}</td>
                            </tr>
                          )
                        })
                      )



                    }



                  </tbody>
                </table>




              </div>
            )
          }






        </div>


        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title >STATUS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              status == "upd" ? ("Uploading to IPFS....") : status == "tsn" ? "Transaction..." : status == "true" ? "Success" : status=="nr"?"You are not registered":"failed"
            }

          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {
              status == "true" ? (<FontAwesomeIcon style={{
                fontSize: "60px",
                color: "#1ECC89"

              }} icon={faCircleCheck} />) : status == "failed" || status == "nr" ? (<FontAwesomeIcon
                style={{
                  fontSize: "60px",
                  color: "#E01B3C"
                }}
                icon={faCircleXmark} />) : (<ScaleLoader color='#1ECC89' width={7} margin={6} />)
            }

          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
