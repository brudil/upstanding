import React from 'react';
import { getElementFromData } from './utils';

export function elementStream(stream) {
  return stream.map(elementData => getElementFromData(elementData));
}

function ElementStream(props) {
  const { stream } = props;

  return (
    <div>
      {elementStream(stream)}
    </div>
  );
}

ElementStream.propTypes = {
  stream: React.PropTypes.array.isRequired,
};

export default ElementStream;
