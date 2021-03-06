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

function CadeHeroContent(props) {
  const { content } = props;

  const dims = props.main ? { w: 611, h: 275 } : { w: 221, h: 138 };

  const imageSettings = {
    w: dims.w,
    h: dims.h,
    q: 55,
    fit: 'crop',
    crop: 'entropy',
    auto: 'format',
    usm: 12,
  };
  return (
    <div
      className={cx('CadeHeroContent', {
        'CadeHeroContent--main': props.main,
        'CadeHeroContent--secondary': props.secondary,
      })}
    >
      <Link to={`/${forms[content.form]}/${content.slug}-${content.id}`}>
        <div className="CadeHeroContent__poster-container">
          <FluidImage
            className="CadeHeroContent__poster"
            src={imgixURL(content.poster_image.resource_name, imageSettings)}
            role="presentation"
            ratio={dims.h / dims.w}
          />
        </div>
        <div className="CadeHeroContent__headline-container">
          <h2 className="CadeHeroContent__headline">
            {content.headline}
          </h2>
          <FrontMeta className="CadeHeroContent__meta" content={content} />
        </div>
      </Link>
    </div>
  );
}

CadeHeroContent.propTypes = {
  content: PropTypes.object.isRequired,
  main: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default CadeHeroContent;
