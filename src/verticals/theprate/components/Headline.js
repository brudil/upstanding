import React from 'react';

function Headline(props) {
  const { headline } = props;
  return (
    <h1 className="Headline">
      {headline}
    </h1>
  );
}

Headline.propTypes = {
  headline: React.PropTypes.string.isRequired,
};

export default Headline;
