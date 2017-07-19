import React from 'react';
import sample from 'lodash/sample';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import taglines from './taglines';

function Header() {
  return (
    <header className="Header">
      <div className="Container Header__container">
        <Link to="/" className="Header__logo">
          <Logo />
        </Link>
        <span>
          {sample(taglines)}
        </span>
      </div>
    </header>
  );
}

Header.propTypes = {};
export default Header;
