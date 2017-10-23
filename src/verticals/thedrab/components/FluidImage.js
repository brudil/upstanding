import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';

function FluidImage(props) {
  return (
    <div
      className="FluidImage"
      style={{ paddingBottom: `${props.ratio * 100}%` }}
    >
      <img
        className="FluidImage__image"
        alt={props.alt || 'untitled'}
        {...omit(props, ['ratio'])}
      />
    </div>
  );
}

FluidImage.propTypes = {
  alt: PropTypes.string,
  ratio: PropTypes.number.isRequired,
};

export default FluidImage;
