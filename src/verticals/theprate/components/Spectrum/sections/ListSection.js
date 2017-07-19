import React from 'react';
import { elementStream } from '../ElementStream';

function ListSection(props) {
  const { data } = props;

  return (
    <section className="DocumentSection ListSection">
      <ul className="ListSection__list">
        {elementStream(data.stream)}
      </ul>
    </section>
  );
}

ListSection.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default ListSection;
