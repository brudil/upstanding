import React from 'react';
import FrontsContent from './FrontsContent';

function FrontContainer(props) {
  const { content } = props;
  const heroContent = content.slice(0, 1);
  const gridContent = content.length > 1 ? content.slice(1) : [];
  return (
    <div className="FrontsContainer">
      <div className="Container">
        <div className="FrontsContainer__hero">
          <FrontsContent hero content={heroContent[0]} />
          <div>Advert!</div>
        </div>
      </div>
      <div className="Container">
        <div className="FrontsContainer__grid">
          {gridContent.map(contentItem =>
            <FrontsContent grid content={contentItem} />
          )}
        </div>
      </div>
    </div>
  );
}

FrontContainer.propTypes = {
  content: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default FrontContainer;
