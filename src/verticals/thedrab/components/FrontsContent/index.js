import React from 'react';
import cx from 'classnames';
import formatDistance from 'date-fns/formatDistance';
import PropTypes from 'prop-types';
import Image from '../Image';
import { Link } from 'react-router-dom';

const forms = {
  ARTICLE: 'article',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
  GALLERY: 'gallery',
};

function ComputedKicker({ content }) {
  if (content.form === 'INTERACTIVE') {
    return <span>Interactive</span>;
  }

  // if series, use series title

  // if tone = news, use section or first topic from that section.

  // if form/tone = quiz, "Quiz"

  return (
    <span>
      {content.kicker}
    </span>
  );
}

function FrontsContent({ content: container, hero = false, grid = false }) {
  console.log(container);
  const content = container.content;
  return (
    <div
      className={cx('FrontsContent', {
        'FrontsContent--hero': hero,
        'FrontsContent--grid': grid,
      })}
    >
      <div className="FrontsContent__image-container u-aspect-166">
        <Image resource={content.posterImage} />
      </div>
      <div className="FrontsContent__info">
        <div className="FrontsContent__meta">
          <span className="FrontsContent__kicker">
            <ComputedKicker content={content} />
          </span>
          •
          <span className="FrontsContent__date">
            {formatDistance(new Date(container.publishedDate), new Date())} ago
          </span>
        </div>
        <h1 className="FrontsContent__headline">
          <Link
            className="FrontsContent__headline-link"
            to={`/${forms[
              content.form
            ]}/${content.slug}-${container.contentId}`}
          >
            {content.headline}
          </Link>
        </h1>
      </div>
      <Link
        className="FrontsContent__faux-link"
        to={`/${forms[content.form]}/${content.slug}-${container.contentId}`}
      />
    </div>
  );
}

FrontsContent.propTypes = {};

export default FrontsContent;
