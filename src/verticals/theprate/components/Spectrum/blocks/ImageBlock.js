import React from 'react';
import { connect } from 'react-redux';
import { imgixURL } from '../../../../../core/components/utils';
import FluidImage from '../../FluidImage';

function ImageBlock(props) {
  const { data, image } = props;

  return (
    <figure>
      <FluidImage
        src={imgixURL(image.resource_name, { w: 800 })}
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

export default connect((state, ownProps) => ({
  image: state.entities.images[ownProps.data.resource.id] || null,
}))(ImageBlock);
