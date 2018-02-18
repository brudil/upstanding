import React from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Container">
        <div className="Footer__logo">
          <Logo white />
        </div>
        <div className="Footer__tag">
          is a satirical endeavor by{' '}
          <a href="https://www.facebook.com/sussexcomedysociety/">The Sussex Comedy Society</a>.
          <Link className="Footer__disclaimer" to="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
