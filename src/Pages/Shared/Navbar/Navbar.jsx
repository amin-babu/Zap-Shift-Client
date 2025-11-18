import React from 'react';
import { MdOutlineMenuOpen } from "react-icons/md";
import Logo from '../../../Components/Logo';
import { NavLink } from 'react-router';

const Navbar = () => {

  const links = <>
    <li><NavLink to={''}>Services</NavLink></li>
    <li><NavLink to={''}>About Us</NavLink></li>
    <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
  </>;

  return (
    <div className="navbar md:rounded-xl bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <MdOutlineMenuOpen size={25} />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <div className='md:pl-3.5'>
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;