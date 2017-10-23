import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { imgixURL } from '../../../../../core/components/utils';
import FluidImage from '../../FluidImage';

function ImageBlock({ data, resources }) {
  const image = resources.lowdownimages[data.resource.id];
  return (
    <figure className="ImageBlock">
      <FluidImage
        src={imgixURL(image.resourceName, {
          w: 800,
        })}
        ratio={image.height / image.width}
      />
      <figcaption className="ImageBlock__meta">
        <span className="ImageBlock__caption">
          {data.caption.text}
        </span>
        <span className="ImageBlock__credit">
          {image.creditUrl
            ? <a href={image.creditUrl}>
                {image.creditTitle || 'Credit'}
              </a>
            : <span>
                {image.creditTitle}
              </span>}
        </span>
      </figcaption>
    </figure>
  );
}

ImageBlock.propTypes = {
  image: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ImageBlock;
