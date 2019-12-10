import PropTypes from 'prop-types';
import React from 'react';
import CanvasBlock from '../blocks/CanvasBlock';

function ArticleSubtype(props) {
  return <CanvasBlock {...props} />;
}

ArticleSubtype.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticleSubtype;
