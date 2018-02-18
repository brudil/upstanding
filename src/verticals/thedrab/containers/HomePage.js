import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { FrontsPaginator } from '../components/FrontsPaginator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical, loadMore }} = this.props;
    if (loading || !vertical) {
      return <LoadingIndicator />;
    }
    const nodes = vertical.allContent.edges.map(edge => edge.node);

    return (
      <div className="Main">
        <Helmet>
          <title>The Drab | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Drab'} />
        </Helmet>
        {nodes.length > 0
          ? <FrontContainer title="Latest" content={nodes} />
          : null}

        <FrontsPaginator hasMore={vertical.allContent.pageInfo.hasNextPage} loadMore={loadMore} />
      </div>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const HomePageData = gql`
  query FrontContent($identifier: String, $cursor: String) {
    vertical(identifier: $identifier) {
      allContent(first: 15, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...FrontsContent
          }
        }
      }
    }
  }
  ${FrontContainer.fragments.content}
`;

const HomepageWithData = graphql(HomePageData, {
  options: {
    variables: {
      identifier: 'thedrab',
    },
  },
  props({ data: { vertical, loading, fetchMore } }) {
    return {data: {
      vertical,
      loading,
      loadMore: () => {
        return fetchMore({
          query: HomePageData,
          variables: {
            identifier: 'thedrab',
            cursor: vertical.allContent.pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.vertical.allContent.edges;
            const pageInfo = fetchMoreResult.vertical.allContent.pageInfo;

            return newEdges.length ? {
              vertical: {
                allContent: {
                  pageInfo,
                  edges: [...previousResult.vertical.allContent.edges, ...newEdges],
                  __typename: previousResult.vertical.allContent.__typename,
                }
              }
            } : previousResult;
          }
        })
      }
    }};
  }
})(HomePage);

export default HomepageWithData;
