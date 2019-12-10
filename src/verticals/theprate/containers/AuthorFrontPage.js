import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet-async';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import FrontsHeader from '../components/FrontsHeader';
import ErrorPage from '../components/ErrorPage';
import NoContent from '../components/NoContent';


class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical, error } } = this.props;
    console.log(this.props);
    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorPage statusCode={404} />;
    }

    const nodes = vertical.author.allContent.edges.map(edge => edge.node);
    return (
      <div className="Main">
        <Helmet>
          <title>The Prate | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Prate'} />
        </Helmet>
        <FrontsHeader title={vertical.author.name} kicker="Author" />

        {nodes.length > 0 ? (
          <FrontContainer title="Latest" content={nodes} />
        ) : (
          <NoContent />
        )}
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
  query FrontContent($identifier: String, $author: String) {
    vertical(identifier: $identifier) {
      author(slug: $author) {
        name
        bio
        slug
        allContent {
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
      author: props.match.params.author,
    },
  }),
})(HomePage);

export default HomepageWithData;
