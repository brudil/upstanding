import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FrontsContent from './FrontsContent/index';
import FrontContainer from './FrontContainer';

function RelatedContent(props) {
  if (props.data.loading) {
    return null;
  }

  if (props.data.error) {
    return null;
  }

  const relatedContent = props.data.vertical.content.relatedContent;

  return (
    <div>
      {relatedContent ? (
        <div>
          <h2>More content</h2>
          <div className="FrontsContainer__grid">
            {relatedContent.map((contentItem, index) => (
              <FrontsContent
                grid
                content={contentItem}
                key={contentItem.contentId}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default graphql(
  gql`
  query RelatedContent($contentId: Int) {
    vertical(identifier: "thedrab") {
      content(contentId: $contentId) {
        relatedContent {
          ...FrontsContent
        }
      }
    }
  }
  ${FrontContainer.fragments.content}
`,
  {
    options: props => ({
      variables: {
        contentId: props.contentId,
      },
      ssr: false,
    }),
  }
)(RelatedContent);
