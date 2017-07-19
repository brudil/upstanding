import React from 'react';
import CadeHero from './Cade/Hero';
import CadeGrid from './Cade/Grid';

function FrontContainer(props) {
  const { content } = props;
  const heroContent = content.slice(0, 1);
  const gridContent = content.slice(1);
  return (
    <div className="Container">
      <CadeHero content={heroContent} />
      <CadeGrid content={gridContent} />
    </div>
  );
}

FrontContainer.propTypes = {
  content: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default FrontContainer;
