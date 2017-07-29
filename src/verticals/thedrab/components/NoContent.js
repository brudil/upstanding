import React from 'react';
import PropTypes from 'prop-types';

function NoContent() {
  return (
    <div className="NoContent">
      <div className="Container">
        {
          "Somehow no one 'written' some stuff that would usually go here."
        }
      </div>
    </div>
  );
}

NoContent.propTypes = {};

export default NoContent;
