import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { PiPersonSimpleBikeLight } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4">ZapShift Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">

            {/* Home */}
            <li>
              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home Page" to='/'>
              <IoHomeOutline size={20}/>
              <span className="is-drawer-close:hidden">Home Page</span>
              </NavLink>
            </li>

            {/* our dashborad links */}
            <li>
              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Parcels" to='/dashboard/my-parcels'>
              <CiDeliveryTruck size={22}/>
              <span className="is-drawer-close:hidden">My parcels</span>
              </NavLink>
            </li>

            {/* Payment History links */}
            <li>
              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History" to='/dashboard/payment-history'>
              <CiCreditCard1 size={22}/>
              <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            {/* Approve Riders */}
            <li>
              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders" to='/dashboard/approve-riders'>
              <PiPersonSimpleBikeLight size={22}/>
              <span className="is-drawer-close:hidden">Approve Riders</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;