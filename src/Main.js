import React from 'react'
import Home from './components/Home'
import About from './pages/About'
import Mintbills from './pages/Mintbills'
import Mywarrentycards from './pages/Dashboard'
import './Styles/main.css'
export default function Main() {
  return (
    <div>
      <About/>
      <Home/>
      <Mintbills/>
      <Mywarrentycards/>
    </div>
  )
}
