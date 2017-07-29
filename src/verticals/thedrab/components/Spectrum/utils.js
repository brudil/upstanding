import React from 'react';

import FreeformSection from './sections/FreeformSection';
import ListSection from './sections/ListSection';
import ListSectionItem from './sections/ListSectionItem';

import ImageBlock from './blocks/ImageBlock';
import HeadingBlock from './blocks/HeadingBlock';
import TextBlock from './blocks/TextBlock';
import PullQuoteBlock from './blocks/PullQuoteBlock';
import CanvasBlock from './blocks/CanvasBlock';

const map = {
  // sections
  freeform: FreeformSection,
  list: ListSection,
  listitem: ListSectionItem,

  // blocks
  image: ImageBlock,
  heading: HeadingBlock,
  text: TextBlock,
  pullquote: PullQuoteBlock,
  canvas: CanvasBlock,
};

export function getElementFromData(data, resources) {
  if (map.hasOwnProperty(data._name)) {
    const Element = map[data._name];
    return <Element data={data} key={data._id} resources={resources} />;
  }
  console.warn('failed to render ', data._name);
  return <hr />;
}
