import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { gql, graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';

class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical } } = this.props;
    if (loading || !vertical) {
      return <LoadingIndicator />;
    }

    return (
      <div className="Main">
        <Helmet>
          <title>The Drab | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Drab'} />
        </Helmet>
        <FrontContainer
          title="Latest"
          content={vertical.allContent.edges.map(edge => edge.node)}
        />
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
  query FrontContent($identifier: String) {
    vertical(identifier: $identifier) {
      allContent {
        edges {
          node {
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
              document
              posterImage {
                resourceName
              }
              resources {
                lowdownimages {
                  id
                  resourceName
                }
              }
            }
          }
        }
      }
    }
  }
`;

const HomepageWithData = graphql(HomePageData, {
  options: {
    variables: {
      identifier: 'thedrab',
    },
  },
})(HomePage);

export default HomepageWithData;
