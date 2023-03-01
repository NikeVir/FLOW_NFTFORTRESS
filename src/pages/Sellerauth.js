import {React,useEffect,useState} from 'react'
import '../Styles/Cstyles/sellerauth.css'
import Modal from 'react-bootstrap/Modal';
import mintABI from '../NftMintABI.json'
import {Link} from "react-router-dom";
import {
	connectWallet,
	getCurrentWalletConnected
  } from '../util/interact';
  import Web3Modal from "web3modal";
import { Alchemy, Network } from 'alchemy-sdk';
import { ScaleLoader } from 'react-spinners'
const { ethers } = require("ethers");


export default function Sellerauth() {
	const [address,setaddress] = useState("")
	const [show, setShow] = useState(false);
	const [spinner,setSpinner] = useState("false")
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	useEffect(()=>{
		const checkwallet = async () => {
			const { address, status } = await getCurrentWalletConnected();
			setaddress(address);
			if(status=="false"){
				await connectWallet();
			}
		  }
		  checkwallet();
	},[])
	var alchemysettings = {
		apiKey: "QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx",
		network: Network.MATIC_MUMBAI,
	  }



	const setregistration =async(e)=>{
		try{
			e.preventDefault();
		
			if(address==""){
				await connectWallet();
			}
			else{
				setSpinner("tns")
				const orgname = e.target.orgname.value;
				const gstno = e.target.orggst.value;
				const web3Modal = new Web3Modal()
				const connection = await web3Modal.connect()
				const provider = new ethers.providers.Web3Provider(connection);
		  
				const signer = provider.getSigner();
				let contract = new ethers.Contract("0x99886c348895FD97fFAFb968E1e3A022368a1039", mintABI, signer)
				let transaction = await contract.ListOrganization(orgname,gstno)
				await transaction.wait()
				alert("transaction Successfull")
				setSpinner("true")
			}
		}catch(err){
			console.log(err)
		}
		
		
	}
	const registerSeller =async(e)=>{
		
		try{
			e.preventDefault();
		if(address==""){
			await connectWallet();
		}
		const orgId = e.target.orgId.value;
		const sellergst = e.target.sellergst.value;
		const web3Modal = new Web3Modal()
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			let contract = new ethers.Contract("0x99886c348895FD97fFAFb968E1e3A022368a1039", mintABI, signer)
			let transaction = await contract.isMember(parseInt(orgId),address)
			if(!transaction){
				alert("Already Registered")
				return
			}
			let register = await contract.registerSeller(address,parseInt(orgId))
			setStatus("true")
		}catch(err){
			console.log(err)
		}
	
	}
  return (
    <div className=" login">
            <div>
                <section>
                    <div className="authcontainer" id="container">
                       
                        <div className="form-container sign-in-container">
                            <form action="#" onSubmit={registerSeller}>
                                <h1>Register</h1>

                                <span> Register as a seller for a particular organization</span>
                                <label>
                                    <input type="number" name="orgId" placeholder="Organization ID" />
                                </label>
                                <label>
                                    <input type="text" name="sellergst" placeholder="GSTNO" />
                                </label>
                                <button type='submit' >Register</button>
                                <a href="#">if already registered then go</a>
								<Link to="/nft-mint"><button>GO</button></Link>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                               
                                <div className="overlay-panel overlay-right">
                                    <h1>Register, Organization!</h1>
                                    <p>Register your organization... </p>
                                    <button className="ghost" onClick={()=>setShow(true)} id="signUp">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
							onSubmit={setregistration}
							>

                                <label>
                                    <input name="orgname" style={{padding:"5px",fontSize:"1rem",margin:"10px"}} type="text" placeholder="Organization Name" />
                                </label>
                                <label>
                                    <input name='orggst' style={{padding:"5px",fontSize:"1rem",margin:"10px"}}  type="text" placeholder="GSTNO" />
                                </label>
							
								<hr/>
								{
									spinner=="false"?(
<button type='submit' style={{padding:"5px 20px",marginLeft:"60%",borderRadius:"8px",background:"#008ecf",color:"#fff",border:"none",maxWidth:"150px"}}>Submit</button>

									):spinner=="tns"?(<ScaleLoader color='#1ECC89' width={7} margin={6} />):spinner=="true"?("-----SUCCESSFUL----"):("---FAILED---")
								}
		  
                            </form>

          </Modal.Body>

        </Modal>
            </div>
        </div>
  )
}
