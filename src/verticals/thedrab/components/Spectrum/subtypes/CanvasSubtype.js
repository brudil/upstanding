import React from 'react';
import CanvasBlock from '../blocks/CanvasBlock';

function ArticleSubtype(props) {
  return <CanvasBlock {...props} />;
}

ArticleSubtype.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default ArticleSubtype;
