import PropTypes from 'prop-types';
import React from 'react';
import ResizerControledIframe from '../../ResizerControledIframe';
import cx from "classnames";

function CanvasBlock({ data, resources }) {
  const interactive = resources.lowdowninteractives[data.resource.slug];
  return (
    <figure className={cx('CanvasBlock', {
      'CanvasBlock--content': data.container === 'CONTENT',
      'CanvasBlock--container': data.container === 'CONTAINER',
      'CanvasBlock--bleed': data.container === 'BLEED',
    })}>      <ResizerControledIframe
        className="CanvasBlock__frame"
        src={`/interactive-frame/${interactive.slug}/v${interactive.releaseNumber}/`}
      />
    </figure>
  );
}

CanvasBlock.propTypes = {
  image: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default CanvasBlock;
