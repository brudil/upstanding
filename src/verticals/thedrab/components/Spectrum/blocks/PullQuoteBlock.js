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
  data: React.PropTypes.object.isRequired,
};

export default PullQuoteBlock;
