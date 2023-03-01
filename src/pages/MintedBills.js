import {React,useState,useEffect} from 'react'
import Nftcard from '../components/Nftcard'
import '../Styles/pagesstyles/mintedNft.css'
import Web3Modal from "web3modal";
import { Alchemy,Network } from 'alchemy-sdk';
import { getCurrentWalletConnected, mintContract } from '../util/interact';
import mintABI from '../NftMintABI.json'
import Modal from 'react-bootstrap/Modal';
const { ethers } = require("ethers");

export default function MintedBills({viewnft,setview}) {
    const [waddress,setAddress] = useState(""); 
    const [nftdetail,setNftdetail] = useState("")
    const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    useEffect(()=>{
        const getconnect =async()=>{
            const {address,status} = await getCurrentWalletConnected();
            setAddress(address)
        }
        getconnect()
    },[waddress])
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


      const TransferToken=async(e)=>{
        e.preventDefault();
        const ads = e.target.address.value;
        const tokenId = e.target.tokenid.value;
    const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      let contract = new ethers.Contract("0x99886c348895FD97fFAFb968E1e3A022368a1039", mintABI, signer)
      console.log(waddress)
      let transaction = await contract.transferFrom(waddress,ads,tokenId);
        console.log(transaction)
    //   let contract = new ethers.Contract("0x2bfb57b3ba0dcfa030ed01956df85c37d40cf87f", mintABI, signer)
    //   let transaction = await contract.approve("0x3e9ce30d57425b2f29332d2f2c6700f7a9a6f75f", nftdetail.tokenId)
    //   await transaction.wait()
      }
  return (
    <div >
 
<div className='mintedNft_main'>
    <div className='warranty_card_ui'> <Nftcard nft={viewnft}/></div>
       
        <div className='product_details'>
            <div>
                <h2 style={{
                    padding:"10px 1rem",
                    background:"#0d6efd",
                    width:"40%",
                    margin:"10px 0",
                    color:"whitesmoke",
                    textAlign:"center",
                    fontWeight:"bold",
                    borderRadius:"6px"

                }}>
                    Name: {viewnft.rawMetadata.name}
                </h2 >
                <h2
                style={{
                    padding:"10px 1rem",
                    background:"#6f42c1",
                    display:"block",
                    margin:"10px 0",
                    color:"whitesmoke",
                    width:"40%",
                    textAlign:"center",
                    fontWeight:"bold",
                    borderRadius:"6px"
                }}
                >          
                   Token ID: {viewnft.tokenId}   
                </h2>
                <h4
                  style={{
                    margin:"10px 0",
                    fontWeight:"bold",
                    marginTop:"4rem",
                    textDecorationLine:"underline"
                }}
                >
                </h4>
                <p 
                style={{
                    margin:"10px 0",
                    fontSize:"16px",
                    minHeight:"150px",
                    border:"0.5px solid grey",
                    padding:"2%",
                    borderRadius:"10px"
                }}
                >
                {viewnft.rawMetadata.description}
                </p>
                <button 
                 style={{
                    fontSize:"18px",
                    Height:"150px",
                    color:"whitesmoke",
                    background:"#d63384",
                    padding:"10px 30px",
                    border:"none"
                
                }}
                onClick={()=>setview(true)}>{"<< Back"}</button>
                <button 
                onClick={()=>setShow(true)}
                 style={{
                    fontSize:"18px",
                    Height:"150px",
                    background:"#6f42c1",
                    padding:"10px 30px",
                    marginLeft:"20px",
                    color:"whitesmoke",
                    border:"none"
                }}
                >Tranfer Product</button>
            </div>
        </div>

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
            <Modal.Title >Register Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                            <form action="#"
							style={{
								display:"flex",
								flexDirection:"column",
								justifyContent:"center"
							}}
							onSubmit={TransferToken}
							>

                                <label>
                                    <input name="address" style={{padding:"5px",fontSize:"1rem",margin:"10px"}} type="text" placeholder="Reciever's Addres" />
                                </label>
                                <label>
                                    <input name='tokenid' style={{padding:"5px",fontSize:"1rem",margin:"10px"}}  type="text" placeholder="Token ID" />
                                </label>
							
								<hr/>
		  <button type='submit' style={{padding:"5px 20px",marginLeft:"60%",borderRadius:"8px",background:"#008ecf",color:"#fff",border:"none",maxWidth:"150px"}}>SEND</button>
                            </form>

          </Modal.Body>

        </Modal>
  
         

</div>

  )
}
