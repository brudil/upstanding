import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Header() {
  return (
    <header className="Header">
      <div className="Container Header__container">
        <Link to="/" className="Header__logo">
          <Logo />
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {};
export default Header;
