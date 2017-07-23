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

function FrontGridContent(props) {
  const { content: container } = props;
  const content = container.content;
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
      <Link
        to={`/${forms[content.form]}/${content.slug}-${container.contentId}`}
      >
        <FluidImage
          className="CadeGridContentCard__poster"
          src={imgixURL(content.posterImage.resourceName, imageSettings)}
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
  className: React.PropTypes.string,
  content: React.PropTypes.object.isRequired,
};

export default FrontGridContent;
