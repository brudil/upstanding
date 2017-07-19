import React from 'react';
import ArticleSubtype from '../subtypes/ArticleSubtype';

function SpectrumDocument(props) {
  const { document } = props;

  return (
    <div className="Document">
      <ArticleSubtype data={document.content} />
    </div>
  );
}

SpectrumDocument.propTypes = {
  document: React.PropTypes.object.isRequired,
};

export default SpectrumDocument;
