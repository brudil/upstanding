import PropTypes from 'prop-types';
import React from 'react';
import ElementStream from '../ElementStream';

function ArticleSubtype(props) {
  const { data } = props;
  return <ElementStream stream={data.stream} />;
}

ArticleSubtype.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticleSubtype;
