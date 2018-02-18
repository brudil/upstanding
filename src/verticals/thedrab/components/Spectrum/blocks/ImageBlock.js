import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { OneImage } from '../../../../../core/components/OneImage';

function ImageBlock({ data, resources }) {
  const image = resources.lowdownimages[data.resource.id];

  return (
    <figure className={cx('ImageBlock', {
      'ImageBlock--content': data.container === 'CONTENT',
      'ImageBlock--container': data.container === 'CONTAINER',
      'ImageBlock--bleed': data.container === 'BLEED',
    })}>
      <OneImage
        src={image.resourceName}
        alt={data.alt.text}
        title={data.title.text}
        aspectRatio={image}
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
