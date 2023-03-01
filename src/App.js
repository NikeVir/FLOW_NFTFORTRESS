
import React from 'react'
import Home from './pages/Home'
import Mintbills from './pages/Mintbills'
import Mywarrentycards from './pages/Dashboard'
import './Styles/main.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Sellerauth from './pages/Sellerauth'
import { connectWallet, getCurrentWalletConnected } from './util/interact'
function App() {

  return (
    <div>
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/nft-mint" element={<Mintbills />}/>

        <Route path="/dashboard" element={<Mywarrentycards />}/>
        <Route path="/sellerauth" element={<Sellerauth />}/>

        </Routes>
      {/* <Mintbills/>*/}
      {/* <Nftcard/>  */}
    </div>
  );
}

export default App;
