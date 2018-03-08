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
  query FrontContent($identifier: String, $cursor: String, $channel: String) {
    vertical(identifier: $identifier) {
      allContent(first: 3, after: $cursor, channel: $channel) {
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
  options: props => ({
    variables: {
      identifier: 'thedrab',
      channel: props.match.url.indexOf('/bitch') === 0 ? 'BITCH' : null,
    },
  }),
  props({data: { vertical, loading, fetchMore }, ownProps: { match } }) {
    return {data: {
      vertical,
      loading,
      loadMore: () => {
        return fetchMore({
          query: HomePageData,
          variables: {
            identifier: 'thedrab',
            cursor: vertical.allContent.pageInfo.endCursor,
            channel: match.url.indexOf('/bitch') === 0 ? 'BITCH' : null,
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
