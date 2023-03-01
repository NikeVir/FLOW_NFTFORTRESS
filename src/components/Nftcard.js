import React,{useState} from 'react'
import '../Styles/Nftcard.css'
import Modal from 'react-bootstrap/Modal';
import QRCode from "react-qr-code";
import Web3Modal from "web3modal";
import mintABI from '../NftMintABI.json'
import {ethers} from 'ethers'


export default function Nftcard({nft}) {
  const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

  const Claim=async(e)=>{
    e.preventDefault();
    const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      let contract = new ethers.Contract("0x99886c348895FD97fFAFb968E1e3A022368a1039", mintABI, signer)
      let transaction = await contract.claim(parseInt(nft.rawMetadata.attributes[6].value),parseInt(nft.tokenId));
      await transaction.wait();
  }
  const checkDate=()=>{
    var d = new Date(nft.rawMetadata.attributes[0].value).getTime();
    console.log(d)
    var x= new Date().getTime();
    console.log(x)
    if(d>x){
      return true;
    }
    return false;
  }
  return (
    <>
    <div className="card">
      <div className="card-header">
        <div className="header-left">
          <img style={{width:"70px",height:"70px",borderRadius:"30%"}} src={nft.rawMetadata.image} alt="" />
        </div>
        <div className="header-right">
          <p className="congrats">Claim Warranty,</p>
          <p className='congrats_content'>
           You can claim warranty on your purchased product before warranty period
          </p>
        </div>
      </div>

      <div className="after-header">
        <p className="text-here">Here is your warranty card:</p>
      </div>
      <div className="card-body">
        <div className="details-box">
          <div className="left-details">
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={nft.tokenUri.raw}
    viewBox={`0 0 256 256`}
    />
</div>
          </div>
          <div className="right-details">
            <div className="warranty-no">
              <p style={{ color: 'grey', fontSize: '14px', fontWeight: 'bold' }}> Token No.</p> <p style={{ fontWeight: "bold" }}>{nft.tokenId}</p>
            </div>
            <div className="valid-until">
              <p style={{ color: 'grey', fontSize: '14px', fontWeight: 'bold' }}>You warranty will be applicable till</p> <p style={{ fontWeight: "bold" }}>{nft.rawMetadata.attributes[0].value}</p>
            </div>
          </div>
        </div>
        <div className="vehicle-details">
          <p className="headingg">Product Details</p>
          <div className="type-regno">
            <div className="label-value">
              <p className="label">Product Type</p>
              <p className="value">Car</p>
            </div>

            <div className="label-value">
              <p className="label">Product no.</p>
              <p className="value" >{nft.rawMetadata.attributes[1].value}</p>
            </div>

            <div className="label-value">
              <p className="label">Purchased Date:</p>
              <p className="value">{nft.rawMetadata.attributes[2].value}</p>
            </div>
          </div>

          <p className="headingg">Additonal Details</p>
          <div className="type-regno">
            <div className="label-value">
              <p className="label">Price</p>
              <p className="value">{nft.rawMetadata.attributes[4].value}</p>
            </div>

            <div className="label-value">
              <p className="label">Location</p>
              <p className="value">{nft.rawMetadata.attributes[3].value}C</p>
            </div>

            <div className="label-value">
              <p className="label">Minter name</p>
              <p className="value">{nft.rawMetadata.attributes[5].value}</p>
            </div>
          </div>
        </div>
        <div className="follow"><p>
          Follow Below steps to request your warranty claim.</p>


        <div className="points">
          <ol>

            <li>Tap on Request Claim</li>

            <li>Enter information and Send Claim Request</li>
          </ol>
        </div>
        </div>
      </div>
      {
        checkDate()?(
          <div onClick={()=>setShow(true)} className="continue-button">Claim</div>

        ):(
          <div onClick={()=>alert("Expired!")} className="continue-button">Expired!</div>
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
            <Modal.Title >Type Reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                            <form action="#"
							style={{
								display:"flex",
								flexDirection:"column",
								justifyContent:"center"
							}}
							onSubmit={Claim}
							>
                                <label>
                                    <textarea name='orggst' style={{padding:"5px",fontSize:"1rem",margin:"10px",width:"80%"}}  type="text" placeholder="tokenId" />
                                </label>
							
								<hr/>
		  <button type='submit' style={{padding:"5px 20px",marginLeft:"60%",borderRadius:"8px",background:"#008ecf",color:"#fff",border:"none",maxWidth:"150px"}}>Claim</button>
                            </form>

          </Modal.Body>

        </Modal>
    </>
  )
}
