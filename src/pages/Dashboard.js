import { React, useState } from 'react'
import '../Styles/pagesstyles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus,faWallet } from '@fortawesome/free-solid-svg-icons'
export default function Mywarrentycards() {
  const [theme, setTheme] = useState("light");
  const [navbtn, setNavbtn] = useState(false);

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
            <div className={`${navbtn ? "brand" : "closesidenav"}`} >NFT LAB</div>
            <div className={`${navbtn ? "side-nav" : "side-nav closesidenav"}`} >
              <div className="menu-item flex active">
                <div className="icon">

                  <ion-icon name="grid"></ion-icon>

                </div>

                <p>Dashboard</p>
              </div>


              <div className="menu-item flex">
                <div className="icon">
                  <ion-icon name="storefront-outline"></ion-icon>
                </div>

                <p>Market</p>
              </div>

              <div className="menu-item flex">
                <div className="icon">
                  <ion-icon name="heart-circle-outline"></ion-icon>
                </div>

                <p>Favourite</p>
              </div>

              <div className="border"></div>

              <div className="menu-item flex">
                <div className="icon">
                  <ion-icon name="reader-outline"></ion-icon>
                </div>

                <p>My Portfolio</p>
              </div>

              <div className="menu-item flex">
                <div className="icon">
                  <ion-icon name="bookmark-outline"></ion-icon>
                </div>

                <p>History</p>
              </div>

              <div className="menu-item flex">
                <div className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </div>

                <p>Wallet</p>
              </div>


            </div>


          </div>


          <div className="dashboard-content">

            <div className="topbar flex flex-sb">
              <div className="search flex">
                <div className="icon">
                  <ion-icon name="search-outline"></ion-icon>
                </div>
                <input type="text" placeholder=" Search any collection" />
              </div>

              <div className="theme flex">
                <div onClick={settheme} className="dark flex">
                  <img src="" alt="" img />

                </div>
                <div onClick={settheme} className="light active flex">
                  <ion-icon name="sunny-outline"></ion-icon>
                </div>
              </div>
              <div>


              </div>

              <div className="user flex flex-sb">
             
                <p><FontAwesomeIcon icon={faSquarePlus} /><span> Create Asset</span> </p>
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>

              <div className="user flex flex-sb">
               
                <p><FontAwesomeIcon icon={faWallet} /> <span>Wallet Address</span> </p>
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
            </div>

            <div className="section flex flex-sb">

              <div className="section-left">

                <div className="box">
                  <div className="banner flex flex-sb">
                    <div className="text">
                      <h2>
                        Discover and sell
                        your own NFTs
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
                        src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-1.jpg"
                        alt=""
                      />
                      <div className="title">Weary Artwork</div>
                      <div className="details flex flex-sb">
                        <div className="author flex">
                          <img
                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                            alt=""
                          />
                          <p>Nio kill 1 </p>
                        </div>
                        <div className="price">4.5 ETH</div>
                      </div>
                    </div>

                    <div className="nft">
                      <img
                        src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-2.jpg"
                        alt=""
                      />
                      <div className="title">Spectrum of Color</div>
                      <div className="details flex flex-sb">
                        <div className="author flex">
                          <img
                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                            alt=""
                          />
                          <p>Nio kill 2</p>
                        </div>
                        <div className="price">4 ETH</div>
                      </div>
                    </div>

                    <div className="nft">
                      <img
                        src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-3.jpg"
                        alt=""
                      />
                      <div className="title">Vivid Artwork</div>
                      <div className="details flex flex-sb">
                        <div className="author flex">
                          <img
                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                            alt=""
                          />
                          <p>Nio kill 3</p>
                        </div>
                        <div className="price">3.5 ETH</div>
                      </div>
                    </div>

                    <div className="nft">
                      <img
                        src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-4.jpg"
                        alt=""
                      />
                      <div className="title">Nature's Love</div>
                      <div className="details flex flex-sb">
                        <div className="author flex">
                          <img
                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                            alt=""
                          />
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

          </div>





        </div>


        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"
        ></script>
        <script
          nomodule
          src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"
        ></script>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        <script src="https://kit.fontawesome.com/ddeff04338.js" crossorigin="anonymous"></script>

        {/* <script src="js/script.js"></script> */}

      </div>
    </div>
  )
}
