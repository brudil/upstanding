import React from 'react';
import sample from 'lodash/sample';
import { Link } from 'react-router-dom';
import Logo from '../BitchLogo';
import taglines from './taglines';

const Nav = () =>
  <nav className="Header__nav">
    <ul className="Header__menu">
      <li className="Header__menu-item">
        <Link className="Header__menu-link" to="/news">
          News
        </Link>
      </li>
      <li className="Header__menu-item">
        <Link className="Header__menu-link" to="/life">
          Life
        </Link>
      </li>
      <li className="Header__menu-item">
        <Link className="Header__menu-link" to="/tone/viewpoint">
          Opinion
        </Link>
      </li>
      <li className="Header__menu-item">
        <Link className="Header__menu-link" to="/form/interactive">
          Interactive
        </Link>
      </li>
    </ul>
  </nav>;

function BitchHeader() {
  return (
    <header className="Header Header--bitch">
      <div className="Container Header__container Header__container--top">
        <div className="Header__logo-container">
          <Link to="/" className="Header__logo">
            <Logo />
          </Link>
          <span className="Header__tagline Header__tagline--mobile">
            {sample(taglines)}
          </span>
        </div>
        <Nav />
      </div>
      <div className="Container Header__container">
        <span className="Header__tagline Header__tagline--desktop">
          {sample(taglines)}
        </span>
      </div>
    </header>
  );
}

BitchHeader.propTypes = {};
export default BitchHeader;
