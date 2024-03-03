import React, { Fragment, useContext, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Components/Assets/freshcart-logo.svg'
import { tokenContext } from '../../Context/TokenContext';
import { cartContext } from '../../Context/AddtoCart';
import { useState } from 'react';

export default function Navbar() {
  let {token,setToken} = useContext(tokenContext)
  let {itemCount} = useContext(cartContext)
  let nav = useNavigate()
  function Logout(){
    localStorage.removeItem("userToken")
    setToken(null)
    nav("/login")
  }




  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {token?   <Fragment>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <li className="nav-item">
         <Link className="nav-link" to="">Home</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="cart">Cart</Link>
       </li>
       <li className="nav-item">
       <Link className="nav-link" to="whishlist">Whishlist</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="/products">Products</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="/categories">Categories</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="/brands">Brands</Link>
       </li>

     </ul>
     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     <li _ngcontent-ccr-c20="" class="nav-item position-relative"><Link _ngcontent-ccr-c20="" to="/cart" class="nav-link ng-star-inserted" href="/Ecommerce/cart"><i _ngcontent-ccr-c20="" class="fa-solid fa-cart-shopping fs-3"></i>
     <div _ngcontent-ccr-c20="" class="badge position-absolute text-white top-0 end-0 bg-main">{itemCount}</div></Link></li>  
     <li className="nav-item d-flex align-items-center">
     <i className='fab mx-2 fa-facebook'></i>
     <i className='fab mx-2 fa-twitter'></i>
     <i className='fab mx-2 fa-instagram'></i>
     <i className='fab mx-2 fa-youtube'></i>
     <i className='fab mx-2 fa-tiktok'></i>
   </li>
     <li className="nav-item">
     <button className="nav-link" onClick={Logout}>Logout</button>
   </li>
     </ul>
        </Fragment>
     :<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     <li className="nav-item">
       <Link className="nav-link" to="/login">Login</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="/register">Register</Link>
     </li>
    
  

   </ul>}
          

        </div>
      </div>
    </nav>
  </>
}
