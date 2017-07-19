import React from 'react';
import HeadingBlock from '../blocks/HeadingBlock';
import ElementStream from '../ElementStream';

function ListSectionItem(props) {
  const { data: { title, stream } } = props;
  return (
    <li className="ListSection__item ListSectionItem">
      <HeadingBlock data={title} />
      <ElementStream stream={stream} />
    </li>
  );
}

ListSectionItem.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default ListSectionItem;
