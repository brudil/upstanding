import PropTypes from 'prop-types';
import React from 'react';
import gql from 'graphql-tag';
import FrontsContent from './FrontsContent';

function FrontContainer(props) {
  const { content } = props;
  const heroContent = content.slice(0, 2);
  const gridContent = content.length > 2 ? content.slice(2) : [];
  return (
    <div className="FrontsContainer">
      <div className="Container">
        <div className="FrontsContainer__hero">
          <FrontsContent hero content={heroContent[0]} />
          {heroContent.length > 1 ? (
            <FrontsContent hero square content={heroContent[1]} />
          ) : null}
        </div>
      </div>
      <div className="Container">
        <div className="FrontsContainer__grid">
          {gridContent.map(contentItem => (
            <FrontsContent
              grid
              content={contentItem}
              key={contentItem.contentId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

FrontContainer.propTypes = {
  content: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

FrontContainer.fragments = {
  content: gql`
    fragment FrontsContent on Content {
      contentId
      publishedDate
      content {
        headline
        kicker
        tone
        authors {
          id
          name
        }
        section {
          slug
          title
        }
        form
        slug
        posterImage {
          resourceName
        }
      }
    }
  `,
};

export default FrontContainer;
