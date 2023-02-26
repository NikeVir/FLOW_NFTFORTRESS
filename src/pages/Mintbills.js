import React from 'react'
import { uploadFileToIPFS,uploadJSONToIPFS  } from '../util/upload';
import mintABI from '../NftMintABI.json'
import Web3Modal from "web3modal";
import { Alchemy,Network } from 'alchemy-sdk';
import upload_img from "./upload.png";
import '../Styles/Mintbills.css'
import axios from 'axios';
export default function Mintbills() {
  const { ethers } = require("ethers");
  var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  const handlesubmit=async(e)=>{
    try{
      e.preventDefault();
      const image = e.target.image.files[0];
      const name  = e.target.name.value;
      const tokenId = 1;
      var res = await uploadFileToIPFS(image,name,tokenId);
      const register = {
        "name" : name,
        "tokenid":tokenId,
        "image":res.pinataURL,
        "description" : e.target.desc.value,
        "symbol" : e.target.symbol.value,
        "attributes":[
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
              "value":e.target.location.value,
          },
          {
            "trait_type": "price",
            "value":e.target.price.value,
        },
        {
          "trait_type": "mintername",
          "value":e.target.mintername.value,
      }
      ]
      }
      console.log(JSON.stringify(register))
      const response = await uploadJSONToIPFS(register);
      console.log("Uploaded JSON to Pinata: ", response)
      if(response.success === false){
          return "Failed";
      }
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      
      const signer = provider.getSigner();
      let contract = new ethers.Contract("0x2bfb57b3ba0dcfa030ed01956df85c37d40cf87f", mintABI, signer)
      let transaction = await contract.safeMint("0x0ffb1A8168bb56DECEABaBd4606200d50078cC1C",response.pinataURL )
      await transaction.wait()
    }
    catch(err){
      console.log(err)
    }
    
    
  }
  var alchemysettings = {
    apiKey: "QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx", 
    network: Network.MATIC_MUMBAI,
  }

const getnft =async()=>{
  const alchemy = new Alchemy(alchemysettings);
  const nfts = await alchemy.nft.getNftsForOwner("0x0ffb1A8168bb56DECEABaBd4606200d50078cC1C");
  // Print NFTs
  console.log(nfts);
  // const web3Modal = new Web3Modal()
  //     const connection = await web3Modal.connect()
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     let contract = new ethers.Contract("0x2bfb57b3ba0dcfa030ed01956df85c37d40cf87f", mintABI, signer)
  //     let transaction = await contract.tokenURI("3")
  //     let meta = await axios.get(transaction,{
  //       headers: {
  //         'Accept': 'text/plain'
  //       }
  //     });
  //     meta = meta.data;
  //     console.log(meta);
}

  return (
    <>
    {/* <div style={{
      width:"70%",
      border:"1px solid white",
      minHeight:"80vh",
      margin:"auto",
      marginTop:"5%"
    }}>
      <form onSubmit={handlesubmit} style={{
        display:"flex",
        flexDirection:"column",
        width:"60%",
        margin:"50px auto"
      }}>
        <input type="file" placeholder='Images' accept="image/*" name="image" id="file" required  />
        <input type="text" name="name"  placeholder='Name'/>
        <input type="text" name="symbol"  placeholder='Symbol'/>
        <textarea placeholder='Description' name='desc'  />
        <input type="date" name="warrentyPeriod"  placeholder='Warrenty period'/>
        <input type="text" name="mintername"  placeholder='Minter Name'/>
        <input type="text" name="productId"  placeholder='Product ID'/>
        <input type="date" name="date"  placeholder='Date'/>
        <input type="text" name="location"  placeholder='Location'/>
        <input type="number"name="price"   placeholder='Price'/>
        <button type='submit'>Submit</button>
      </form>
        <button onClick={getnft}>get</button>
      
    </div> */}
    
    <div className="page-container">
      <div className="top-rectanglee">
        <h1>NFT_FORTRESS Minter</h1>
      </div>
      <div className="mint-box">
        <h2>Mint your NFT</h2>
        <div className="mint-form">
          <div className="left-form">
            <p style={{ fontSize: "27px", margin: "11px", fontWeight: "bold" }}>
              Upload
            </p>
            <div className="uploado">
              <div className="upload-box">
                <button>Design on Canva</button>

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
                            height="200vh"
                            src={upload_img}
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
                <label htmlFor="productid">Product ID</label>
                <input type="text" id="productid" />
              </div>

              <div className="form-input">
                <label htmlFor="name">Minter Name</label>
                <input type="text" id="name" />
              </div>
            </div>
          </div>
          <div className="right-form">
            <div className="form-input">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" />
            </div>
            <div className="form-input" style= {{marginBottom:"5px",marginTop:"15px"}}>
              <label htmlFor="description">Description:</label>
              <textarea id="description"></textarea>
            </div>
            <div className="form-input" style= {{marginBottom:"5px"}}>
              <p>NFT Type:</p>
              <div className="checkbox-box">
                <label>
                  <input type="checkbox" name="nft-type" value="image" /> Image
                </label>
                <label>
                  <input type="checkbox" name="nft-type" value="video" /> Video
                </label>
              </div>
            </div>
            <div className="form-input">
              <p>Warranty Period</p>
              <input type="date" />
            </div>
            <div className="form-input">
              <p>Date</p>
              <input type="date" id="date" />
            </div>
            <div className="form-input" style={{ marginBottom: "2%" }}>
              <label htmlFor="location">Location</label>
              <input type="text" id="location" />
            </div>
            <div className="form-input">
              <label className="terms">
                <input type="checkbox" name="agree" />
              </label>
              <p>I agree to the terms and conditions.</p>
            </div>
          </div>
        </div>
        <div className="concluding-text">
          <p style={{marginTop:"0%"}}>
            By minting this NFT, you certify that you are the rightful owner of
            the content and have the legal right to mint and sell it as an NFT.
          </p>
        </div>
        <button className="mint-button">Mint</button>
      </div>
    </div>
    <style>
      {
        `form input {
          margin:5px 0;
          height:30px;
         }
         textarea{
          margin:5px 0;
          height:100px;
          overflow-y:scroll;
         }
         button{
          height:30px;
          margin:5px 0;

         }
        
        `

      }
     
     
    </style>
        </>
  )
}
