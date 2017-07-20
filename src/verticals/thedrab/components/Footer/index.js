import React from 'react';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="Container">
        <div className="Footer__logo">
          <Logo white />
        </div>
        <div className="Footer__tag">
          is a satirical endeavor by{' '}
          <a href="https://comsoc.co">
            The Sussex Comedy Society
          </a>.
        </div>
      </div>
    </footer>
  );
}
