import PropTypes from 'prop-types';
import React from 'react';
import HeadingBlock from '../blocks/HeadingBlock';
import ElementStream from '../ElementStream';

function ListSectionItem({ data: { title, stream }, resources }) {
  return (
    <li className="ListSection__item ListSectionItem">
      <HeadingBlock data={title} resources={resources} />
      <ElementStream stream={stream} resources={resources} />
    </li>
  );
}

ListSectionItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ListSectionItem;
