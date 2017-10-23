import PropTypes from 'prop-types';
import React from 'react';
import TimeAgo from 'react-timeago';

function FrontMeta({ className, content }) {
  return (
    <div className={className}>
      {content.authors.map(author =>
        <span key={author.id}>
          {author.name}
        </span>
      )}
      <span> / </span>
      {content.published ? <TimeAgo date={content.published} /> : null}
    </div>
  );
}

FrontMeta.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
};

export default FrontMeta;
