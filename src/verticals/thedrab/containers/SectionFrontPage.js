import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { gql, graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
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
  query FrontContent($identifier: String, $section: String) {
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
      section: props.match.params.section,
    },
  }),
})(HomePage);

export default HomepageWithData;
