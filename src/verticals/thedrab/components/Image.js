import React from 'react';
import PropTypes from 'prop-types';
import Imgix from 'react-imgix';

function ImageContainer({ resource }) {
  return <Imgix className="u-aspect-fill" precision={10} src={`https://drafty.imgix.net/${resource.resourceName}`} />;
}

ImageContainer.propTypes = {};

export default ImageContainer;
