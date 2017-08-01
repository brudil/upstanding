import React from 'react';
import PropTypes from 'prop-types';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import { gql, graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import FrontsHeader from '../components/FrontsHeader';
import NoContent from "../components/NoContent";

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
        <FrontsHeader
          title={this.props.match.params
            .form}
          kicker="Form"
        />
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
  query FrontContent($identifier: String, $form: Form) {
    vertical(identifier: $identifier) {
      allContent(form: $form) {
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
    },
  }),
})(HomePage);

export default HomepageWithData;
