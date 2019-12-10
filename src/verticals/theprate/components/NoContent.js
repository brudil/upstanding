import React from 'react';
import PropTypes from 'prop-types';

function NoContent() {
  return (
    <div className="NoContent">
      <div className="Container">
        {
          "We can't find anything to go here. Obviously this has never happened before."
        }
      </div>
    </div>
  );
}

NoContent.propTypes = {};

export default NoContent;
