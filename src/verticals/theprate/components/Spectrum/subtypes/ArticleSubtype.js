import React from 'react';
import ElementStream from '../ElementStream';

function ArticleSubtype(props) {
  const { data } = props;
  return <ElementStream stream={data.stream} />;
}

ArticleSubtype.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default ArticleSubtype;
