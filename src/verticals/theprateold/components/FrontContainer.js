import PropTypes from 'prop-types';
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
  content: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default FrontContainer;
