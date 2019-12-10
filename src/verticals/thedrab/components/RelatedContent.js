import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FrontsContent from './FrontsContent/index';
import FrontContainer from './FrontContainer';

const RelatedContentQuery = gql`
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
`

function RelatedContent(props) {
  const { data, loading, error } = useQuery(RelatedContentQuery, {
    variables: {
      contentId: props.contentId,
    },
    ssr: false,
  })

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

export default RelatedContent;
