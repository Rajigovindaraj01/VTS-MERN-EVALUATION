import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar({search, setSearch}) {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          FOOD<span>SPOT</span>
        </h1>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search food...." value={search} onChange={(e)=>setSearch(e.target.value)} ></input>
        <button>search</button>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;

