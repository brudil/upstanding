import React from 'react';
import FrontGridContent from './FrontGridContent';

function FrontGrid(props) {
  return (
    <ul className="FrontGrid">
      {props.content.map(content =>
        <FrontGridContent
          className="FrontGrid__item"
          content={content}
          key={content.id}
        />
      )}
    </ul>
  );
}

FrontGrid.propTypes = {
  content: React.PropTypes.array.isRequired,
};

export default FrontGrid;
