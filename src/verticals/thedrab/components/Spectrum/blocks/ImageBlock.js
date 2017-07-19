import React from 'react';
import { connect } from 'react-redux';
import { imgixURL } from '../../../../../core/components/utils';
import FluidImage from '../../FluidImage';

function ImageBlock({ data, resources }) {
  const image = resources.lowdownimages[data.resource.id];
  return (
    <figure>
      <FluidImage
        src={imgixURL(image.resourceName, {
          w: 800,
        })}
        ratio={image.height / image.width}
      />
      <figcaption>
        {data.caption.text}
      </figcaption>
    </figure>
  );
}

ImageBlock.propTypes = {
  image: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default ImageBlock;
