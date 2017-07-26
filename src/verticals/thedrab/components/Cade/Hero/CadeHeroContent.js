import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { imgixURL } from '../../../../../core/components/utils';
import FluidImage from '../../FluidImage';
import FrontMeta from '../../FrontMeta';

const forms = {
  ARTICLE: 'article',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
  GALLERY: 'gallery',
};

function CadeHeroContent(props) {
  const { content: container } = props;
  const content = container.content;
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
      <Link
        to={`/${forms[content.form]}/${content.slug}-${container.contentId}`}
      >const forms = {
        ARTICLE: 'article',
        VIDEO: 'video',
        INTERACTIVE: 'interactive',
        GALLERY: 'gallery',
      };
        <div className="CadeHeroContent__poster-container">
          <FluidImage
            className="CadeHeroContent__poster"
            src={imgixURL(content.posterImage.resourceName, imageSettings)}
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
  content: React.PropTypes.object.isRequired,
  main: React.PropTypes.bool,
  secondary: React.PropTypes.bool,
};

export default CadeHeroContent;
