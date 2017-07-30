import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../components/LoadingIndicator';
import ContentPageComponent from '../components/ContentPage';
import { gql, graphql } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import getPathForContent from '../utils/getPathForContent';
import ErrorPage from '../components/ErrorPage';

class ContentPage extends React.Component {
  render() {
    const { data: { loading, error }, data } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorPage statusCode={404} />;
    }

    const container = data.vertical.content;
    const content = container.content;

    if (
      this.props.match.params.form !== content.form.toLowerCase() ||
      this.props.match.params[0] !== content.slug
    ) {
      return <Redirect status={301} to={getPathForContent(container)} />;
    }

    return <ContentPageComponent container={container} content={content} />;
  }
}

ContentPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const ContentPageData = gql`
  query ContentPage($identifier: String, $contentId: Int) {
    vertical(identifier: $identifier) {
      content(contentId: $contentId) {
        contentId
        publishedDate
        content {
          ...ContentPage
        }
      }
    }
  }
  ${ContentPageComponent.fragments.ContentPage}
`;

const ContentWithData = graphql(ContentPageData, {
  options: ({ match: { params: { contentId } } }) => ({
    variables: {
      identifier: 'thedrab',
      contentId,
    },
  }),
})(ContentPage);

export default withRouter(ContentWithData);
