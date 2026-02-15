import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Cart from './pages/cart'

function App() {

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  return (
    <>
    <div className='app-container'>
    <BrowserRouter>
    <Navbar search={search} setSearch={setSearch}></Navbar>
    <Routes>
      <Route path='/' element={<Home search={search} cart={cart} setCart={setCart} />}></Route>
      <Route path='/cart' element={<Cart cart={cart}/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
