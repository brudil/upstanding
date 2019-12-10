import PropTypes from 'prop-types';
import React from 'react';
import ElementStream from '../ElementStream';

function FreeformSection({ data, resources }) {
  return (
    <section className="DocumentSection">
      <ElementStream stream={data.stream} resources={resources} />
    </section>
  );
}

FreeformSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FreeformSection;
