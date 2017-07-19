import React from 'react';
import cx from 'classnames';

function Byline(props) {
  const { authors } = props;
  return (
    <div className={cx('Byline', props.className)}>
      {authors.map((author, index) =>
        <div className="Byline__author" key={author.id}>
          {author.first_name} {author.last_name}
          <span>{index < authors.length - 1 ? ' and ' : ''}</span>
        </div>
      )}
    </div>
  );
}

Byline.propTypes = {
  authors: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
};

export default Byline;
