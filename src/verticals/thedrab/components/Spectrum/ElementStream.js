import React from 'react';
import { getElementFromData } from './utils';

export function elementStream(stream, resources) {
  return stream.map(elementData => getElementFromData(elementData, resources));
}

function ElementStream({ stream, resources }) {
  return (
    <div>
      {elementStream(stream, resources)}
    </div>
  );
}

ElementStream.propTypes = {
  stream: React.PropTypes.array.isRequired,
  resources: React.PropTypes.object.isRequired,
};

export default ElementStream;
