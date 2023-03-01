
import './index.css'
import React,{useContext, useEffect} from 'react'
import Home from './pages/Home'
import Mintbills from './pages/Mintbills'
import Mywarrentycards from './pages/Dashboard'
import './Styles/main.css'
import Nftcard from './components/Nftcard'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MintedBills from './pages/MintedBills'
import Sellerauth from './pages/Sellerauth'
import UserContext from './ContextProvider'
import { connectWallet, getCurrentWalletConnected } from './util/interact'
function App() {

  return (
    <div>
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/nft-mint" element={<Mintbills />}/>

        <Route path="/dashboard" element={<Mywarrentycards />}/>
        <Route path="/sellerauth" element={<Sellerauth />}/>
        <Route path="/dashboard/mintedbills" element={<MintedBills />}/>

        </Routes>
      {/* <Mintbills/>*/}
      {/* <Nftcard/>  */}
    </div>
  );
}

export default App;
