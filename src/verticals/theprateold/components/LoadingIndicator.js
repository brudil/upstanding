import React from 'react';
import logotypeP from '../images/logotype-letter-p.svg';

function LoadingIndicator() {
  return (
    <div className="LoadingIndicator">
      <img
        className="LoadingIndicator__indicator"
        src={logotypeP}
        alt="Loading"
      />
    </div>
  );
}

export default LoadingIndicator;
