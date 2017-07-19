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
        <FluidImage
          className="FrontGridContent__poster"
          src={imgixURL(content.poster_image.resource_name, imageSettings)}
          role="presentation"
          ratio={171 / 281}
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
  className: React.PropTypes.string,
  content: React.PropTypes.object.isRequired,
};

export default FrontGridContent;
