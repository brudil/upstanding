import React from 'react';
import PropTypes from 'prop-types';

function FrontsHeader({ title, kicker = null }) {
  return (
    <div className="FrontsHeader">
      <div className="Container">
        {kicker !== null
          ? <div className="FrontsHeader__kicker">
              {kicker}
            </div>
          : null}
        <h1 className="FrontsHeader__heading">
          {title}
        </h1>
      </div>
    </div>
  );
}

FrontsHeader.propTypes = {};

export default FrontsHeader;
