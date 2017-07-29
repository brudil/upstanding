import React from 'react';
import ResizerControledIframe from '../../ResizerControledIframe';

function CanvasBlock({ data, resources }) {
  const interactive = resources.lowdowninteractives[data.resource.slug];
  return (
    <figure className="CanvasBlock">
      <ResizerControledIframe
        className="CanvasBlock__frame"
        src={`/interactive-frame/${interactive.slug}/v${interactive.releaseNumber}/`}
      />
    </figure>
  );
}

CanvasBlock.propTypes = {
  image: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default CanvasBlock;
