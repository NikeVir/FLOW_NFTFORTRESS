import { React, useState } from 'react'
import '../Styles/pagesstyles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faCreditCardAlt, faFolderClosed, faHome, faHomeLg, faHomeLgAlt, faHomeUser, faShop, faSquarePlus, faWallet } from '@fortawesome/free-solid-svg-icons'
import Mynft from '../components/Mynft';
export default function Mywarrentycards() {
  const [theme, setTheme] = useState("light");
  const [navbtn, setNavbtn] = useState(false);
  const [dashnav, setDashnav] = useState('dashboard')
  const settheme = () => {
    const dark = document.querySelector(".dark");
    const light = document.querySelector(".light");
    if (theme == "light") {
      document.querySelector("body").classList.add("darkMode");
      dark.classList.add("active");
      light.classList.remove("active");
      setTheme("dark")
    }
    else {
      document.querySelector("body").classList.remove("darkMode");
      dark.classList.remove("active");
      light.classList.add("active");
      setTheme("light")

    }
  }
  const onClicknav = () => {
    if (navbtn) {
      setNavbtn(false);
    }
    else {
      setNavbtn(true)
    }
  }



  return (
    <div>
      <div>

        <div className="dashboard">
          <div className={`${navbtn ? "sidebar flex-c flex-sb" : "sidebar closesidebar flex-c flex-sb"}`}>
            <span className={`${navbtn ? "sidenavbtn" : "sidenavbtn"}`} onClick={onClicknav}></span>
            <div className={`${navbtn ? "brand" : " brand closesidenav"}`} >NFT LAB</div>
            <div className={`${navbtn ? "side-nav" : "side-nav closesidenav"}`} >
              <div className="menu-item flex active">
                <p onClick={()=>setDashnav("dashboard")}><FontAwesomeIcon icon={faHomeLgAlt} />Dashboard</p>
              </div>
              <div className="menu-item flex">
                <p onClick={()=>setDashnav("marketplace")}><FontAwesomeIcon icon={faShop} />Market</p>
              </div>
              <div className="border"></div>
              <div className="menu-item flex">
                <p onClick={()=>setDashnav("mybills")}><FontAwesomeIcon icon={faCreditCard} />My Products</p>
              </div>
              <div className="menu-item flex">
                <p onClick={()=>setDashnav("history")}><FontAwesomeIcon icon={faFolderClosed} />History</p>
              </div>
            </div>

          </div>

<div className="dashboard-content">

<div className="topbar flex flex-sb">
  <div className="user flex flex-sb">

    <p><FontAwesomeIcon icon={faSquarePlus} /><span> Create Asset</span> </p>
    <p><FontAwesomeIcon icon={faWallet} /> <span>Wallet Address</span> </p>
  </div>
</div>
{
  (dashnav=="dashboard")?(
<div className="section flex flex-sb">

  <div className="section-left">

    <div className="box">
      <div className="banner flex flex-sb">
        <div className="banner_text">
          <h2>
            Discover and sell
            your own product with NFT luxury
          </h2>

          <a href="#" className="btn">Discover Now</a>
        </div>

        <img
          src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/banner.svg"
          alt=""
        />
      </div>

      <div className="graph flex-c">
        <p>Balance</p>
        <h2>93,565.00</h2>

      </div>
    </div>

    <div className="nfts">
      <div className="trending heading flex flex-sb">

      </div>

      <div className="categories flex flex-sb">
      </div>
      <div className="browse">
        <div className="nft">
          <img
            src="/polygon.png"
            alt=""
          />
          <div className="details " style={{ textAlign: "center" }}>

            <p>BALANCE</p>

            <div className="price" >4.5 ETH</div>
          </div>
        </div>

        <div className="nft">
          <img
            src="/wallet.png"
            alt=""
          />
          <div className="title">TOTAL OWNED</div>
          <div className="details flex flex-sb">
            <div className="author flex">

              <p>Nio kill 2</p>
            </div>
            <div className="price">4 ETH</div>
          </div>
        </div>



        <div className="nft">
          <img
            src="/history.png"
            alt=""
          />
          <div className="title">EXPIRED</div>
          <div className="details flex flex-sb">
            <div className="author flex">

              <p>Nio kill 4</p>
            </div>
            <div className="price">5 ETH</div>
          </div>
        </div>
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
