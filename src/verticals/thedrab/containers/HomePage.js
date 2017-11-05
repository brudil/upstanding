import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical } } = this.props;
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
})(HomePage);

export default HomepageWithData;
