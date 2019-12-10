import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { imgixURL } from '../../../../../core/components/utils';
import FluidImage from '../../FluidImage';
import FrontMeta from '../../FrontMeta';

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
    <div className={cx('CadeGridContentCard', props.className)}>
      <Link to={`/${forms[content.form]}/${content.slug}-${content.id}`}>
        <div className="CadeGridContentCard__section-label">
          {content.section.title}
        </div>
        <FluidImage
          className="CadeGridContentCard__poster"
          src={imgixURL(content.poster_image.resource_name, imageSettings)}
          role="presentation"
          ratio={171 / 281}
        />
        <FrontMeta className="CadeGridContentCard__meta" content={content} />
        <h2 className="CadeGridContentCard__headline">
          {content.headline}
        </h2>
      </Link>
    </div>
  );
}

FrontGridContent.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
};

export default FrontGridContent;
