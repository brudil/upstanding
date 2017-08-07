import React from 'react';
import ArticleSubtype from '../subtypes/ArticleSubtype';
import CanvasSubtype from '../subtypes/CanvasSubtype';

function SpectrumDocument({ document, resources }) {
  return (
    <div className="Document">
      {document.content._name === 'article'
        ? <ArticleSubtype data={document.content} resources={resources} />
        : null}
      {document.content._name === 'canvas_subtype'
        ? <CanvasSubtype data={document.content} resources={resources} />
        : null}
    </div>
  );
}

SpectrumDocument.propTypes = {
  document: React.PropTypes.object.isRequired,
};

export default SpectrumDocument;
