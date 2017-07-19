import React from 'react';
import ElementStream from '../ElementStream';

function FreeformSection(props) {
  const { data } = props;

  return (
    <section className="DocumentSection">
      <ElementStream stream={data.stream} />
    </section>
  );
}

FreeformSection.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default FreeformSection;
