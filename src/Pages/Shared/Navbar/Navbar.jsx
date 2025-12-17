import React from 'react';
import { MdOutlineMenuOpen } from "react-icons/md";
import Logo from '../../../Components/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => console.log('Log out successfully'))
      .catch(error => {
        console.log(error);
      })
  };

  const links = <>
    {/* <li><NavLink to={''}>Services</NavLink></li>
    <li><NavLink to={''}>About Us</NavLink></li> */}
    <li><NavLink to={'/send-percel'}>Send Percel</NavLink></li>
    <li><NavLink to={'/rider'}>Rider</NavLink></li>
    <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
    {
      user && <>
        <li><NavLink to={'/dashboard/my-parcels'}>Dashboard</NavLink></li>
      </>
    }
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
        {
          user ?
            <a onClick={handleLogout} className="btn">Log Out</a> :
            <Link to='/login' className="btn">Login</Link>
        }
        <Link to='/rider' className="btn btn-primary text-secondary ml-2.5">Be a rider</Link>
      </div>
    </div>
  );
};

export default Navbar;