import React from 'react'
import { uploadFileToIPFS,uploadJSONToIPFS  } from '../util/upload';
import mintABI from '../NftMintABI.json'
import Web3Modal from "web3modal";
import { Alchemy,Network } from 'alchemy-sdk';
import axios from 'axios';
export default function Mintbills() {
  const { ethers } = require("ethers");
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
    <div style={{
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
