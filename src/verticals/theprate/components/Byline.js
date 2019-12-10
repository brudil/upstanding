import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';

function Byline(props) {
  const { authors, publishedDate } = props;
  console.log(publishedDate);
  return (
    <div className={cx('Byline', props.className)}>
      <span>Written by </span>
      {authors.map((author, index) =>
        <div className="Byline__author" key={author.id}>
          <Link className="Byline__link" to={`/author/${author.slug}`}>
            {author.name}
          </Link>
          <span>
            {index < authors.length - 1 ? ' and ' : ''}
          </span>
        </div>
      )}
      <span>
        , published {formatDistance(new Date(publishedDate), new Date())} ago
      </span>
    </div>
  );
}

Byline.propTypes = {
  authors: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Byline;
