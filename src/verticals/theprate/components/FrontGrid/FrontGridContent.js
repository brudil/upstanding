import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { imgixURL } from '../utils';
import FluidImage from '../FluidImage';
import FrontMeta from '../FrontMeta';

const forms = {
  1: 'article',
  2: 'video',
  3: 'interactive',
  4: 'gallery',
};

function FrontGridContent(props) {
  const { content } = props;
  const imageSettings = {
    w: 281,
    h: 171,
    q: 55,
    fit: 'crop',
    crop: 'entropy',
    auto: 'format',
    usm: 12,
  };
  return (
    <li className={cx('FrontGridContent', props.className)}>
      <Link to={`/${forms[content.form]}/${content.slug}-${content.id}`}>
        <OneImage
          className="FrontGridContent__poster"
          src={content.poster_image.resource_name}
          role="presentation"
          aspectRatio={AspectRatio.r20by9}
        />
        <h2 className="FrontGridContent__headline">
          {content.headline}
        </h2>
      </Link>
      <FrontMeta className="FrontGridContent__meta" content={content} />
    </li>
  );
}

FrontGridContent.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
};

export default FrontGridContent;
