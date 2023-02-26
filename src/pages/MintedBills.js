import {React,useState,useEffect} from 'react'
import ListNFT from '../components/ListNFT';
import Nftcard from '../components/Nftcard'
import '../Styles/pagesstyles/mintedNft.css'
import Web3Modal from "web3modal";
import { Alchemy,Network } from 'alchemy-sdk';
import { mintContract } from '../util/interact';
import mintABI from '../NftMintABI.json'
import MarketABI from '../MaketPlaceABI.json';
export default function MintedBills() {
    const [listNft,setListNft] = useState(false);
    const { ethers } = require("ethers");
    const [nftdetail,setNftdetail] = useState("")
    const [listprice,setListprice] = useState("")
    useEffect(()=>{

    },[])
    var alchemysettings = {
        apiKey: "QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx", 
        network: Network.MATIC_MUMBAI,
      }
      const getnft =async()=>{
        const alchemy = new Alchemy(alchemysettings);
        const nfts = await alchemy.nft.getNftsForOwner("0x0ffb1A8168bb56DECEABaBd4606200d50078cC1C");
        // Print NFTs
        setNftdetail(nfts.ownedNfts[4]);
        console.log(nfts.ownedNfts[4])
      }
      const ListNFTtoMarket=async()=>{
    const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      let contract = new ethers.Contract("0x3e9ce30d57425b2f29332d2f2c6700f7a9a6f75f", MarketABI, signer)
      let transaction = await contract.getAlllistings();
        console.log(transaction)
    //   let contract = new ethers.Contract("0x2bfb57b3ba0dcfa030ed01956df85c37d40cf87f", mintABI, signer)
    //   let transaction = await contract.approve("0x3e9ce30d57425b2f29332d2f2c6700f7a9a6f75f", nftdetail.tokenId)
    //   await transaction.wait()
      }
  return (
    <div >{
        !listNft?(
<div className='mintedNft_main'>
    <div className='warranty_card_ui'> <Nftcard/></div>
       
        <div className='product_details'>
            <div>
                <h2 style={{
                    padding:"10px 1rem",
                    background:"purple",
                    width:"40%",
                    margin:"10px 0",
                    color:"whitesmoke",
                    textAlign:"center",
                    fontWeight:"bold"

                }}>
                    Name of NFT
                </h2 >
                <h2
                style={{
                    padding:"10px 1rem",
                    background:"grey",
                    display:"block",
                    margin:"10px 0",
                    color:"whitesmoke",
                    width:"40%",
                    textAlign:"center",
                    fontWeight:"bold"
                }}
                >Product Id</h2>
                <h4
                  style={{
                    margin:"10px 0",
                    fontWeight:"bold",
                    marginTop:"4rem",
                    textDecorationLine:"underline"
                }}
                >
                    PRODUCT DESCRIPTION
                </h4>
                <p 
                style={{
                    margin:"10px 0",
                    fontSize:"16px",
                    minHeight:"150px"
                }}
                >
                The Air Jordan series by Jordan Brand is considered the greatest signature shoe collection ever. The Air Jordan Retro line is at the forefront of modern sneaker collecting culture. Jordan Brand’s flagship model is the Air Jordan 1, a timeless retro basketball shoe first released in 1985 and now offered in three popular silhouettes: high-top, mid-top, and low-top, all of which are consistently the most in-demand sneakers on the market, whether it be the re-release of beloved original colorways, all-new looks, or part of limited edition sneaker collaborations with artists and musicians. Other perennial favorite Air Jordan sneakers are the Air Jordan 3, Air Jordan 4, Air Jordan 6, and Air Jordan 11, just to name a few. Each of Michael Jordan’s sneakers offer plenty of ‘80s and ‘90s basketball nostalgia, as well as a glimpse into the personal life of the greatest basketball player ever. Sneaker culture simply would not be what it is today without the Air Jordan series. Jordan Brand also offers a wide range of high-performance modern day basketball footwear, as well as other lifestyle and performance footwear outside of the Retro Air Jordan line.
                </p>
                <button 
                 style={{
                    fontSize:"18px",
                    Height:"150px",
                    background:"green",
                    padding:"10px 30px"
                }}
                onClick={()=>setListNft(true)}>List NFT</button>
                <button >Tranfer Product</button>
            </div>
        </div>

        </div>
        ):(
            <div className='listNFT'>
                <button onClick={()=>setListNft(false)} className="listNFT_close_btn">x</button>
                <div className='listNFT_box'>
                <div className="listing_image">
                {
        nftdetail==""?(""):(
            
                    <img src={nftdetail.rawMetadata.image} />
        )}
                </div>
<div className="listing_details">
    {
        nftdetail==""?(""):(<>
            <h1>{nftdetail.title}</h1>
             <h1>Product ID</h1>
             <h3>{nftdetail.tokenId}</h3>
             <h4>{nftdetail.rawMetadata.attributes[5].value}</h4>
             <h5>{nftdetail.rawMetadata.description}</h5>
             <input type="number" value={listprice} onChange={(e)=>setListprice(e.target.value)} placeholder='PRICE'/>
         </>)
    }
    <button onClick={getnft}>get NFT</button>
    <button onClick={ListNFTtoMarket}>List NFT</button>
         

</div>

                </div>
        </div>
        )
    }
        
       
    </div>
  )
}
