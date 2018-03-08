import React from 'react';
import cx from 'classnames';
import formatDistance from 'date-fns/formatDistance';
import { OneImage, AspectRatio } from '../../../../core/components/OneImage';
import { Link } from 'react-router-dom';
import BitchLogo from '../bitch/BitchLogo';
import getPathForContent from '../../utils/getPathForContent';

function ComputedKicker({ content }) {
  if (content.form === 'INTERACTIVE') {
    return <span>Interactive</span>;
  }

  // if series, use series title

  // if tone = news, use section or first topic from that section.

  // if form/tone = quiz, "Quiz"

  return <span>{content.kicker}</span>;
}

function FrontsContent({
  content: container,
  hero = false,
  grid = false,
  square = false,
}) {
  const content = container.content;
  return (
    <div
      className={cx('FrontsContent', {
        'FrontsContent--bitch': content.channel === 'BITCH',
        'FrontsContent--hero': hero,
        'FrontsContent--hero-square': square,
        'FrontsContent--grid': grid,
      })}
    >
      <div
        className={cx('FrontsContent__image-container', {
          'u-aspect-166': !square,
          'u-aspect-169': square,
        })}
      >
        <OneImage
          src={content.posterImage.resourceName}
          aspectRatio={AspectRatio.r20by9}
          alt=""
        />
      </div>
      <div className="FrontsContent__info">
        <div className="FrontsContent__meta">
          {content.channel === 'BITCH' ? <div className="FrontsContent__channel FrontsContent__channel--bitch">
            <BitchLogo />
          </div> : null}
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
            to={getPathForContent(container)}
          >
            {content.headline}
          </Link>
          {content.tone === 'VIEWPOINT' ? (
            <span className="FrontsContent__author-inline">
              {' '}
              by{' '}
              {content.authors.map((author, index) => (
                <span key={author.id}>
                  {author.name}
                  <span>
                    {index < content.authors.length - 1 ? ' and ' : ''}
                  </span>
                </span>
              ))}
            </span>
          ) : null}
        </h1>
      </div>
      <Link
        className="FrontsContent__faux-link"
        to={getPathForContent(container)}
      />
    </div>
  );
}

FrontsContent.propTypes = {};

export default FrontsContent;
