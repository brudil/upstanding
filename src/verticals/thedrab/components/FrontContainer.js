import React from 'react';
import CadeHero from './Cade/Hero';
import CadeGrid from './Cade/Grid';

function FrontContainer(props) {
  const { content } = props;
  const heroContent = content.slice(0, 1);
  const gridContent = content.length > 1 ? content.slice(1) : [];
  return (
    <div>
      <div className="Container Container--bleed">
        <CadeHero content={heroContent} />
      </div>
      <div className="Container">
        <CadeGrid content={gridContent} />
      </div>
    </div>
  );
}

FrontContainer.propTypes = {
  content: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default FrontContainer;
