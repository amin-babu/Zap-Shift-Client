import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const RootLayout = () => {
  return (
    <div className='bg-[#EAECED]'>
      <div className='md:max-w-11/12 md:mx-auto '>
        <nav className='md:py-5'>
          <Navbar></Navbar>
        </nav>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;