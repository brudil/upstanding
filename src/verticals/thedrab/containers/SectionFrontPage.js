import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import FrontsHeader from '../components/FrontsHeader';
import ErrorPage from '../components/ErrorPage';
import NoContent from '../components/NoContent';
import {FrontsPaginator} from "../components/FrontsPaginator";

class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical, error, loadMore } } = this.props;
    console.log(this.props);
    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorPage statusCode={404} />;
    }

    const nodes = vertical.section.allContent.edges.map(edge => edge.node);
    return (
      <div className="Main">
        <Helmet>
          <title>The Drab | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Drab'} />
        </Helmet>
        <FrontsHeader title={this.props.match.params.section} kicker="Section" />

        {nodes.length > 0
          ? <FrontContainer title="Latest" content={nodes} />
          : <NoContent />}

        <FrontsPaginator hasMore={vertical.section.allContent.pageInfo.hasNextPage} loadMore={loadMore} />

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
  query FrontContent($identifier: String, $section: String, $cursor: String) {
    vertical(identifier: $identifier) {
      section(slug: $section) {
        title
        slug
        allTopics(last: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
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
  }
  ${FrontContainer.fragments.content}
`;

const HomepageWithData = graphql(HomePageData, {
  options: props => ({
    variables: {
      identifier: 'thedrab',
      section: props.match.params.section,
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
              cursor: vertical.section.allContent.pageInfo.endCursor,
              section: match.params.section,
              channel: match.url.indexOf('/bitch') === 0 ? 'BITCH' : null
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.vertical.section.allContent.edges;
              const pageInfo = fetchMoreResult.vertical.section.allContent.pageInfo;

              return newEdges.length ? {
                vertical: {
                  section: {
                    ...previousResult.vertical.section,
                    allContent: {
                      pageInfo,
                      edges: [...previousResult.vertical.allContent.edges, ...newEdges],
                    }
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
