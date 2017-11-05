import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import FrontsHeader from '../components/FrontsHeader';
import ErrorPage from "../components/ErrorPage";
import NoContent from "../components/NoContent";

class HomePage extends React.Component {
  render() {
    const { data: { loading, vertical, error } } = this.props;
    if (loading || !vertical) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorPage status={404} />
    }

    const nodes = vertical.allContent.edges.map(edge => edge.node);
    return (
      <div className="Main">
        <Helmet>
          <title>The Drab | Be content, not content</title>
          <meta property="og:image" content="" />
          <meta property="og:description" content={'The Drab'} />
        </Helmet>
        <FrontsHeader title={this.props.match.params.tone} kicker="Tone" />

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
  query FrontContent($identifier: String, $tone: Tone) {
    vertical(identifier: $identifier) {
      allContent(tone: $tone) {
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
      tone: props.match.params.tone.toUpperCase(),
    },
  }),
})(HomePage);

export default HomepageWithData;
