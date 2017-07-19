import React from 'react';
import ReactMarkdown from 'react-markdown';

function TextBlock(props) {
  const { data } = props;

  return (
    <div className="Block Block--standard TextBlock">
      <ReactMarkdown source={data.text.text} />
    </div>
  );
}

TextBlock.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default TextBlock;
