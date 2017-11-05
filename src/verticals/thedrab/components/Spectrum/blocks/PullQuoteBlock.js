import PropTypes from 'prop-types';
import React from 'react';

function PullQuoteBlock(props) {
  const { data } = props;

  return (
    <div className="Block Block--standard PullQuoteBlock">
      {data.quote.text}

      {data.attribution.text ? (
        <div className="PullQuoteBlock__attribution">
          {data.attribution.text}
        </div>
      ) : null}
    </div>
  );
}

PullQuoteBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PullQuoteBlock;
