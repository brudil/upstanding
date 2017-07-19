import React from 'react';

import FreeformSection from './sections/FreeformSection';
import ListSection from './sections/ListSection';
import ListSectionItem from './sections/ListSectionItem';

import ImageBlock from './blocks/ImageBlock';
import HeadingBlock from './blocks/HeadingBlock';
import TextBlock from './blocks/TextBlock';

const map = {
  // sections
  freeform: FreeformSection,
  list: ListSection,
  listitem: ListSectionItem,

  // blocks
  image: ImageBlock,
  heading: HeadingBlock,
  text: TextBlock,
};

export function getElementFromData(data, resources) {
  if (map.hasOwnProperty(data._name)) {
    const Element = map[data._name];
    return <Element data={data} key={data._id} resources={resources} />;
  }
  return (
    <div>
      Rendering issue {data._name}
    </div>
  );
}
