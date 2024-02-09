import React, { startTransition, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavbarHome.css';
import { IconContext } from 'react-icons';
import logo from './logo3.png';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbarHome'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div>
          <img
        src={logo}
        alt="Website Logo"
        style={{
          width: '60%',
          maxWidth: '300px', // Set a maximum width if needed
          marginRight: '62rem',
          padding: '55px',
          
          }}
      />
          </div>
          <Link to='/login' className='text-xl font-semibold mr-4'>Login / Register</Link>

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

