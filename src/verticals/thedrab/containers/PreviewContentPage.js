import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../components/LoadingIndicator';
import ContentPageComponent from '../components/ContentPage';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

class PreviewContentPage extends React.Component {
  render() {
    const { data: { loading, error }, data } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorPage statusCode={404} />;
    }

    const content = { ...data.previewContent };

    if (content.posterImage === null) {
      content.posterImage = {
        resourceName: '0b2c01c8-13b3-4641-a75e-86d628f836e9',
      };
    }

    if (content.authors === null || content.authors.length >= 0) {
      content.authors = [
        {
          name: 'Mr ADD A AUTHOR',
          slug: 'add-an-author',
        },
        {
          name: 'Jodie NOT A NAME',
          slug: 'not-a-name',
        },
      ];
    }

    return (
      <ContentPageComponent
        container={{ contentId: -1, publishedDate: new Date() }}
        content={content}
        preview
      />
    );
  }
}

PreviewContentPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const PreviewContentPageData = gql`
  query ContentPage($revisionId: Int, $previewKey: String) {
    previewContent(revisionId: $revisionId, previewKey: $previewKey) {
      ...ContentPage
    }
  }
  ${ContentPageComponent.fragments.ContentPage}
`;

const PreviewContentWithData = graphql(PreviewContentPageData, {
  options: ({ match: { params: { revisionId, previewKey } } }) => ({
    variables: {
      identifier: 'thedrab',
      revisionId,
      previewKey,
    },
  }),
})(PreviewContentPage);

export default withRouter(PreviewContentWithData);
