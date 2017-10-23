import PropTypes from 'prop-types';
import React from 'react';

function PullQuoteBlock(props) {
  const { data } = props;

  return (
    <div className="Block Block--standard PullQuoteBlock">
      {data.quote.text}
    </div>
  );
}

PullQuoteBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PullQuoteBlock;
