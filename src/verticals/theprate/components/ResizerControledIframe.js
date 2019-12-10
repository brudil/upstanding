import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';
import iframeResizer from 'iframe-resizer/js/iframeResizer';

class ResizerManagedIframe extends React.Component {
  componentDidMount() {
    this.iframeResizer = iframeResizer(this.props.options, this.iframeElement);
  }

  componentWillUnmount() {
    this.iframeResizer.map(iframe => iframe.iFrameResizer.close());
  }

  render() {
    return (
      <iframe
        {...omit(this.props, ['children', 'options'])}
        ref={ref => {
          this.iframeElement = ref;
        }}
      >
        {this.children}
      </iframe>
    );
  }
}

ResizerManagedIframe.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  src: PropTypes.string,
  options: PropTypes.object,
};

ResizerManagedIframe.defaultProps = {
  options: {},
};

export default ResizerManagedIframe;
