import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import toast, { Toaster } from 'react-hot-toast';



export default function Layout() {
  return (
    <Fragment>
      <Navbar/>
      <Outlet/>
      <Toaster/>
      <Footer/>
    </Fragment>
  )
}
