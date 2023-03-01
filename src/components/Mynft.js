import React, { useEffect, useState,useContext } from 'react'
import '../Styles/pagesstyles/Dashboard.css'
import { Alchemy, Network } from 'alchemy-sdk';
import MintedBills from '../pages/MintedBills';
import { getCurrentWalletConnected } from '../util/interact';
export default function Mynft() {
  const [mynfts,setMynfts] = useState([])
  const [vnft,setViewNft] = useState({})
  const [view,setview] = useState(true);
 
  useEffect(()=>{
   
        getnft()
  },[])
  var alchemysettings = {
    apiKey: "QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx",
    network: Network.MATIC_MUMBAI,
  }

  const getnft = async () => {
    const {address,status} = await getCurrentWalletConnected();
      const alchemy = new Alchemy(alchemysettings);
      const nfts = await alchemy.nft.getNftsForOwner(address);
      console.log(nfts)
       var arr = [];
       for(var i=0;i<nfts.ownedNfts.length;i++){
        if(nfts.ownedNfts[i].contract.address =="0x99886c348895fd97ffafb968e1e3a022368a1039"){
         arr.push(nfts.ownedNfts[i])
        }
        setMynfts(arr);
      }
 

  }
  const viewNft = (index)=>{
    setViewNft(mynfts[index])
    setview(false)
  }

  return (
    <div className='mynft_container'>
      {
        view?(
          <div>
          <h2>WARRENTY CARDS</h2>
         <div className='nfts_grids'>
          {
            mynfts.length==0?("NO NFTS"):(

              mynfts.map((item,index)=>{
                return(
                  <div className="nft" key ={index}>
                  <img
                    src={item.rawMetadata.image}
                    alt=""
                  />
                  <div className="nft_details">
                  <div className="title">{item.rawMetadata.name}</div>
                    <div className="nft_dates">
                    <div>
                    <span>Product ID</span>

                      <p>{item.tokenId}</p>
                      </div>
                      <div>
                        <span>Last Date</span>
                      <p>{item.rawMetadata.attributes[0].value}</p>
                      </div>
                      <div>
                      <span>Date of issued</span>
                      <p>{item.rawMetadata.attributes[2].value}</p>

                      </div>
                     
        
                    </div>
                    <div onClick={()=>viewNft(index)} className="price">view</div>
                  </div>
                </div>
                )
             

              })
            )
          }
         </div>
      </div>
        ):(
          <MintedBills viewnft={vnft} setview ={setview} />
        )
      }

        
    </div>
  )
}
