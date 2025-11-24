import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Button } from '../Button/Button'; 

function NavBar({ isLoggedIn }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);


  const renderMenuItems = () => {
    if (isLoggedIn) {
      return (
        <>
          <li className='nav-item'>
            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/artikel' className='nav-links' onClick={closeMobileMenu}>Artikel</Link>
          </li>
          <li className='nav-item'>
            <Link to='/history' className='nav-links' onClick={closeMobileMenu}>History</Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          {/* <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>Services</Link>
          </li>
          <li className='nav-item'>
            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>Products</Link>
          </li> */}
          <li className='nav-item'>
            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>Sign Up</Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={isLoggedIn ? '/dashboard' : '/'} className='navbar-logo' onClick={closeMobileMenu}>
            KI
          </Link>
          
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {renderMenuItems()}
          </ul>

          {!isLoggedIn ? (
            button && <Button to='/sign-up' buttonStyle='btn--outline'>SIGN UP</Button>
          ) : (
            <div className='profile-container'>
              <div className='profile-icon' onClick={toggleProfileDropdown}>
                <i className="fas fa-user"></i>
              </div>

              {profileDropdown && (
                <div className='profile-dropdown'>
                  <div className='dropdown-header'>
                    <div className='dropdown-avatar'>
                      <i className="fas fa-user"></i>
                    </div>
                    <div className='dropdown-info'>
                      <h4>John Doe</h4>
                      <p>cooljd@gmail.com</p>
                      <Link to='/profile' className='manage-link'>Manage Account</Link>
                    </div>
                    <Link to='/' className='sign-out-btn'>Sign Out</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;