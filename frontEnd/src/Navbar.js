import React, { startTransition, useState,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
// import logo from './logoB.png';
import logo from './logo3.png';
import { useNavigate } from "react-router-dom";
import Logout from "./icons/Logout";    

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    const closeSidebarOnClickOutside = (e) => {
      if (sidebar && !e.target.closest('.nav-menu')) {
        setSidebar(false);
      }
    };

    document.addEventListener('click', closeSidebarOnClickOutside);

    return () => {
      document.removeEventListener('click', closeSidebarOnClickOutside);
    };
  }, [sidebar]);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar justify-between left-0 right-0 z-10 '>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='bg-blend-overlay'>
          <img src={logo} alt="Website Logo" style={{
          width: '60%',
          maxWidth: '300px', // Set a maximum width if needed
          marginRight: '70rem',
          padding: '55px',
          
          }}/>
          </div>

          <div className="flex items-center gap-3">
        <Logout />
        <div className="hidden md:flex items-center gap-5 text-white">
          <div
            className="cursor-pointer
          md:text-xl font-bold pr-2 "
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </div>
          <img 
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

