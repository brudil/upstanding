import React from 'react';
import PropTypes from 'prop-types';

function FrontsHeader({ title }) {
  return (
    <div className="FrontsHeader">
      <div className="Container">
        <h1 className="FrontsHeader__heading">
          {title}
        </h1>
      </div>
    </div>
  );
}

FrontsHeader.propTypes = {};

export default FrontsHeader;
