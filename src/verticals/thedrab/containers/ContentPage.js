import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import Document from '../components/Spectrum/Document';
import Byline from '../components/Byline';
import LoadingIndicator from '../components/LoadingIndicator';
import Headline from '../components/Headline';
import FluidImage from '../components/FluidImage';
import { imgixURL } from '../../../core/components/utils';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class ContentPage extends React.Component {
  render() {
    const { data: { loading }, data } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }
    const container = data.vertical.content;
    const content = container.content;

    const imageHeight = 400;
    const imageWidth = 880;
    const posterImageUrl = imgixURL(content.posterImage.resourceName, {
      w: imageWidth,
      h: imageHeight,
    });

    return (
      <div className="Main">
        <Helmet title={content.headline} />
        <div className="ContentPage Container">
          <article>
            <div className="Content__meta">
              <div className="Content__kicker">
                {content.kicker}
              </div>
              <h1 className="Content__title">
                {content.headline}
              </h1>
              <div className="Content__meta">
                <Byline
                  className="ContentHeader__byline"
                  authors={content.authors}
                  publishedDate={container.publishedDate}
                />
              </div>
            </div>
            <FluidImage
              src={posterImageUrl}
              role="presentation"
              ratio={imageHeight / imageWidth}
            />

            <div className="Content__body">
              <Document
                document={content.document}
                resources={mapValues(content.resources, resources =>
                  keyBy(resources, 'id')
                )}
              />
            </div>
          </article>
        </div>
      </div>
    );
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
          headline
          kicker
          tone
          authors {
            id
            name
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
              width
              height
            }
          }
        }
      }
    }
  }
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
