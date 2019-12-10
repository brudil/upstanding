import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet-async';
import FrontsHeader from '../components/FrontsHeader';
import NoContent from "../components/NoContent";
import {FrontsPaginator} from "../components/FrontsPaginator";

class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical, loadMore } } = this.props;
    if (loading || !vertical) {
      return <LoadingIndicator />;
    }
    const nodes = vertical.allContent.edges.map(edge => edge.node);
    return (
      <div className="Main">
        <Helmet>
          <title>The Prate | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Prate'} />
        </Helmet>
        <FrontsHeader
          title={this.props.match.params
            .form}
          kicker="Form"
        />
        {nodes.length > 0
          ? <FrontContainer title="Latest" content={nodes} />
          : <NoContent />}

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
  query FrontContent($identifier: String, $form: Form, $cursor: String) {
    vertical(identifier: $identifier) {
      allContent(form: $form, first: 15, after: $cursor) {
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
      form: props.match.params.form.toUpperCase(),
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
              form: match.params.form.toUpperCase(),
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
