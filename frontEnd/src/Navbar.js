import React, { startTransition, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
// import LoginSignup from './pages/LoginSignup';
// import React, {useState} from "react";
// import Search from "../icons/Search";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import Hamburger from "../icons/Hamburger";
// import Cancel from "../icons/Cancel";
// import { useDispatch, useSelector } from "react-redux";
// import { toggle } from "../context/sidebarSlice";
import Logout from "./icons/Logout";                                                            
// import Dark from "../icons/Dark";
// import Light from "../icons/Light";
// import { SidebarData } from "./SidebarData";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar justify-between left-0 right-0 z-10 px-4'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <span className='text-white text-2xl font-bold pr-[67.5rem]' >GitaSoulConnect</span>
          {/* <Link to='/Login' className='text-xl font-semibold pl-[57.5rem]'>Login / Register</Link> */}

          <div className="flex items-center gap-3">
        {/* {dark ? <Light /> : <Dark />} */}
        {/* {dark ? <Light /> : <Dark />} */}

        {/* // Logout */}
        <Logout />
        <div className="hidden md:flex items-center gap-5 text-white">
          <div
            className="cursor-pointer
          md:text-xl font-bold pr-2 "
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/home");
            }}
          >
            Logout
          </div>
          <img
            //onClick={() => navigate("/login")}
            src={
              user?.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
            }
            alt="profile"
            className="
          w-6 h-6
          md:w-7 md:h-7 rounded-full cursor-pointer mr-4"
          />
        </div>
      </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                
              );
            })}
            
          </ul>
          
    
        </nav>
      </IconContext.Provider> 
    </>
  );
}

export default Navbar;

