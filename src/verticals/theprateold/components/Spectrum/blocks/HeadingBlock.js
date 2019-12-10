import PropTypes from 'prop-types';
import React from 'react';

function HeadingBlock(props) {
  const { data } = props;

  return (
    <h1 className="Block Block--standard HeadingBlock">
      {data.text.text}
    </h1>
  );
}

HeadingBlock.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HeadingBlock;
