import { React, useEffect, useState } from 'react'
import '../Styles/pagesstyles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard,  faFolderClosed,  faHomeLgAlt,  faShop, faSquarePlus, faWallet } from '@fortawesome/free-solid-svg-icons'
import Mynft from '../components/Mynft';
import { connectWallet,
  getCurrentWalletConnected } from '../util/interact';
import { Alchemy, Network } from 'alchemy-sdk';


export default function Mywarrentycards() {

  const [walletaddress,setWalletaddress] = useState("")
  const [navbtn, setNavbtn] = useState(false);
  const [dashnav, setDashnav] = useState('dashboard')
  const [balance,setbalance] = useState('0')
  const [tcards,setTcards] = useState(0)
  const onClicknav = () => {
    if (navbtn) {
      setNavbtn(false);
    }
    else {
      setNavbtn(true)
    }
  }
  const OnconnectWallet =async()=>{
    const walletResponse = await connectWallet();
    setWalletaddress(walletResponse.address);
  }
  useEffect(()=>{
    const getaddress=async()=>{
      
      const {address,status}= await getCurrentWalletConnected();
      await connectWallet();
      if(address==undefined){
        await connectWallet();
      const {address,status}= await getCurrentWalletConnected();
      setWalletaddress(address);
     }
      
     else{
       setWalletaddress(address);
     }
    }
    getaddress()
    getTransaction()
  },[])
  var alchemysettings = {
    apiKey: "QfT2kCFxO-Iq94Vzw70-EflkOW1P7OPx",
    network: Network.MATIC_MUMBAI,
  }
  const getTransaction = async () => {
    const {address,status}= await getCurrentWalletConnected();
    const alchemy = new Alchemy(alchemysettings);
    const nfts = await alchemy.nft.getNftsForOwner(address);
    const Transfers = await alchemy.core.getBalance(address);
    var x = Transfers._hex.substring(2)
    var y = parseInt(x,16)/1000000000000000000;
    setTcards(nfts.ownedNfts.length);
    setbalance(y.toFixed(2))
   
  }

  return (
    <div>
      <div>

        <div className="dashboard">
          <div className={`${navbtn ? "sidebar flex-c flex-sb" : "sidebar closesidebar flex-c flex-sb"}`}>
            <span className={`${navbtn ? "sidenavbtn" : "sidenavbtn"}`} onClick={onClicknav}></span>
            <div className={`${navbtn ? "brand" : " brand closesidenav"}`} >NFTFORTRESS</div>
            <div className={`${navbtn ? "side-nav" : "side-nav closesidenav"}`} >
              <div className="flex menu-item active">
                <p onClick={()=>setDashnav("dashboard")}><FontAwesomeIcon icon={faHomeLgAlt} />Dashboard</p>
              </div>

              <div className="flex menu-item">
                <p onClick={()=>setDashnav("mybills")}><FontAwesomeIcon icon={faCreditCard} />My Products</p>
              </div>
              {/* <div className="flex menu-item">
                <p onClick={()=>setDashnav("history")}><FontAwesomeIcon icon={faFolderClosed} />History</p>
              </div> */}
            </div>
          </div>

<div className="dashboard-content">

<div className="flex topbar flex-sb">
  <div onClick={OnconnectWallet} className="flex user flex-sb">

    {/* <p><FontAwesomeIcon icon={faSquarePlus} /><span> Create Asset</span> </p> */}
    <p><FontAwesomeIcon icon={faWallet} /> <span >{walletaddress==''?"Connect Wallet":(walletaddress.substring(0, 6) +
          "..." +
          walletaddress.substring(38))}</span> </p>
  </div>
</div>
{
  (dashnav=="dashboard")?(
<div className="flex section flex-sb">

  <div className="section-left">

    <div className="box">
      <div className="flex banner flex-sb">
        <div className="banner_text">
          <h2>
            Manage your Warranty and bills with NFT luxury
          </h2>

          <a href="#" className="btn">Check Now</a>
        </div>

        <img
          src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/banner.svg"
          alt=""
        />
      </div>

    
    </div>

    <div className="nfts">
      <div className="flex trending heading flex-sb">

      </div>

      <div className="flex categories flex-sb">
      </div>
      <div className="browse">
        <div className="nft">
          <img
            src="/polygon.png"
            alt=""
          />
          <div className="details " style={{ textAlign: "center" }}>

            <p>BALANCE</p>

            <div className="price" >{balance} MATIC</div>
          </div>
        </div>

        <div className="nft">
          <img
            src="/wallet.png"
            alt=""
          />
          <div  className="details " style={{ textAlign: "center" }}>
          <p>TOTAL CARDS</p>
            <div className="price">{tcards}</div>
          </div>
        </div>



        {/* <div className="nft">
          <img
            src="/history.png"
            alt=""
          />
          <div className="title">EXPIRED</div>
          <div className="flex details flex-sb">
            <div className="flex author">

              <p>Nio kill 4</p>
            </div>
            <div className="price">5 ETH</div>
          </div>
        </div> */}
      </div>
    </div>
  </div>

  <div>

  </div>


</div>
 ) : (dashnav=="marketplace")?("marketplace"):( dashnav=="mybills")?(
  <div>
    <Mynft/>
    </div>
 )
 :("hello")
}
</div>
 
          



        </div>



      </div>
    </div>
  )
}
