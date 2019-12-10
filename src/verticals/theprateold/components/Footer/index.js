import React from 'react';
import logotypeWhite from '../../images/logotype-white-site.svg';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Container">
        <img className="Footer__logotype" src={logotypeWhite} alt="The Prate" />
        <div className="Footer__tag">Some rights reserved.</div>
      </div>
    </footer>
  );
}
