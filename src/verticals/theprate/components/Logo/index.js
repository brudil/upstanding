import React from 'react';

const logoImage = require('../../images/logotype-site.svg');

export default function Logo() {
  return (
    <img
      className="Logo"
      src={logoImage}
      alt="The Prate"
      title="The Prate | Exceptionally average"
    />
  );
}
