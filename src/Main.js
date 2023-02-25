import React from 'react'
import Home from './pages/Home'
import Mintbills from './pages/Mintbills'
import Testdash from './pages/Testdash'
// import Mywarrentycards from './pages/Dashboard'
import './Styles/main.css'
import Nftcard from './components/Nftcard'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
export default function Main() {
  return (
    <div>
        <Route path="/" element={<Home />}/>
        <Route path="/nft-mint" element={<Mintbills />}/>
        <Route path="/dash" element={<Testdash />}/>

      {/* <Mintbills/>*/}
      {/* <Nftcard/>  */}
    </div>
  )
}
