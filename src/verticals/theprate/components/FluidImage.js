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
  alt: React.PropTypes.string,
  ratio: React.PropTypes.number.isRequired,
};

export default FluidImage;
