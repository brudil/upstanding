import React from 'react';
import cx from 'classnames';
import formatDistance from 'date-fns/formatDistance';

function Byline(props) {
  const { authors, publishedDate } = props;
  console.log(publishedDate);
  return (
    <div className={cx('Byline', props.className)}>
      <span>Written by </span>
      {authors.map((author, index) =>
        <div className="Byline__author" key={author.id}>
          {author.name}
          <span>{index < authors.length - 1 ? ' and ' : ''}</span>
        </div>
      )}
      <span>, published {formatDistance(new Date(publishedDate), new Date())} ago</span>
    </div>
  );
}

Byline.propTypes = {
  authors: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
};

export default Byline;
