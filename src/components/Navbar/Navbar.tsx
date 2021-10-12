import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SettingsDropdown from "./SettingsDropdown";
import BillingDropdown from "./BillingDropdown";
import MerchantsDropdown from "./MerchantsDropdown";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState({
    merchants: false,
    settings: false,
    billing: false
  });

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = (name: string) => {
    if (window.innerWidth < 960) {
      setDropdown(state => ({ ...state, [name]: false }));
    } else {
      setDropdown(state => ({ ...state, [name]: true }));
    }
  };

  const onMouseLeave = (name: string) => {
    setDropdown(state => ({ ...state, [name]: false }));
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Merchant Hub Admin
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
              className="nav-item"
              onMouseEnter={() => onMouseEnter('merchants')}
              onMouseLeave={() => onMouseLeave('merchants')}
          >
            <Link
                to="/onboarding"
                className="nav-links"
                onClick={closeMobileMenu}
            >
              Merchants <i className="fas fa-caret-down" />
            </Link>
            {dropdown.merchants && <MerchantsDropdown />}
          </li>
          <li
              className="nav-item"
              onMouseEnter={() => onMouseEnter('settings')}
              onMouseLeave={() => onMouseLeave('settings')}
          >
            <Link
                to="/settings"
                className="nav-links"
                onClick={closeMobileMenu}
            >
              Settings <i className="fas fa-caret-down" />
            </Link>
            {dropdown.settings && <SettingsDropdown />}
          </li>
          <li
              className="nav-item"
              onMouseEnter={() => onMouseEnter('billing')}
              onMouseLeave={() => onMouseLeave('billing')}
          >
            <Link to="/billing" className="nav-links" onClick={closeMobileMenu}>
              Billing <i className="fas fa-caret-down" />
            </Link>
            {dropdown.billing && <BillingDropdown />}
          </li>
          <li className='nav-item'>
            <Link
                to='/support'
                className='nav-links'
                onClick={closeMobileMenu}
            >
              Support
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
