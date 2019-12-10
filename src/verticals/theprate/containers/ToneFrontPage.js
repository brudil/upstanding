import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { graphql, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet-async';
import FrontsHeader from '../components/FrontsHeader';
import ErrorPage from "../components/ErrorPage";
import NoContent from "../components/NoContent";
import {FrontsPaginator} from "../components/FrontsPaginator";

const HomePageData = gql`
  query FrontContent($identifier: String, $tone: Tone, $cursor: String) {
    vertical(identifier: $identifier) {
      allContent(tone: $tone, first: 15, after: $cursor) {
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


const HomePage = ({ match }) =>  {
    const { data, loading, error } = useQuery(HomePageData, {
      variables: {
        identifier: 'thedrab',
        tone: match.params.tone.toUpperCase(),
        channel: match.url.indexOf('/bitch') === 0 ? 'BITCH' : null
      },
    });
    if (loading || !data) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorPage status={404} />
    }

    const nodes = data.vertical.allContent.edges.map(edge => edge.node);
    return (
      <div className="Main">
        <Helmet>
          <title>The Drab | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Drab'} />
        </Helmet>
        <FrontsHeader title={match.params.tone} kicker="Tone" />

        {nodes.length > 0
          ? <FrontContainer title="Latest" content={nodes} />
          : <NoContent />}

       {/* { <FrontsPaginator hasMore={vertical.allContent.pageInfo.hasNextPage} loadMore={loadMore} />} */}
      </div>
    );
  }

  /*
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
              tone: match.params.tone.toUpperCase(),
              channel: match.url.indexOf('/bitch') === 0 ? 'BITCH' : null
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
 */

export default HomePage;
