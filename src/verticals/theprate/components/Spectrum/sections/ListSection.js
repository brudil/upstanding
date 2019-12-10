import PropTypes from 'prop-types';
import React from 'react';
import { elementStream } from '../ElementStream';

function ListSection({ data, resources }) {

  return (
    <section className="DocumentSection ListSection">
      <ul className="ListSection__list">
        {elementStream(data.stream, resources)}
      </ul>
    </section>
  );
}

ListSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ListSection;
