import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Derive state from user context
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPERUSER';

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    navigate('/');
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
            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
            Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/artikel' className='nav-links' onClick={closeMobileMenu}>
            Artikel
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/history' className='nav-links' onClick={closeMobileMenu}>
            History
            </Link>
          </li>

          {isAdmin && (
            <li className='nav-item'>
                <Link to='/admin-panel' className='nav-links' onClick={closeMobileMenu}>
                Admin Panel
                </Link>
            </li>
          )}
          
        </>
      );
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={isLoggedIn ? '/dashboard' : '/'} className='navbar-logo' onClick={closeMobileMenu}>
            <img src="/images/Logo.png" alt="Logo" className='navbar-logo-img'/>
          </Link>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {renderMenuItems()}
          </ul>

          {!isLoggedIn ? (
            null
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
                      <h4>{user?.full_name || user?.username}</h4>
                      <p>{user?.email}</p>
                      <Link to='/editProfile' className='manage-link'>Edit Profile</Link>
                    </div>
                    <Link to='/editPass' className='manage-link'>Edit Password</Link>
                    <button onClick={handleLogout} className='sign-out-btn'>Sign Out</button>
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