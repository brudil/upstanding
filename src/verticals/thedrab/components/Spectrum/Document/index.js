import React from 'react';
import ArticleSubtype from '../subtypes/ArticleSubtype';

function SpectrumDocument({ document, resources }) {

  return (
    <div className="Document">
      <ArticleSubtype data={document.content} resources={resources} />
    </div>
  );
}

SpectrumDocument.propTypes = {
  document: React.PropTypes.object.isRequired,
};

export default SpectrumDocument;
