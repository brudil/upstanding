import React from 'react';
import ElementStream from '../ElementStream';

function ArticleSubtype({ data, resources }) {
  return <ElementStream stream={data.stream} resources={resources} />;
}

ArticleSubtype.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default ArticleSubtype;
