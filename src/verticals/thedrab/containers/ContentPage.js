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
import { imgixURL, imgixText } from '../../../core/components/utils';
import { gql, graphql } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import getPathForContent from '../utils/getPathForContent';
import ErrorPage from '../components/ErrorPage';
const Base64 = require('js-base64').Base64;

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

    const imageHeight = 400;
    const imageWidth = 880;
    const posterImageUrl = imgixURL(content.posterImage.resourceName, {
      w: imageWidth,
      h: imageHeight,
    });

    if (
      this.props.match.params.form !== content.form.toLowerCase() ||
      this.props.match.params[0] !== content.slug
    ) {
      return <Redirect status={301} to={getPathForContent(container)} />;
    }
    return (
      <div className="Main">
        <Helmet title={content.headline} encodeSpecialCharacters={false}>
          <meta
            property="og:url"
            content={`https://thedrab.co${getPathForContent(container)}`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content={`https://thedrab.co/external/ogimage/${container.contentId}/`}
          />
          <meta property="og:description" content={content.standfirst} />
        </Helmet>
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
            <figure className="Content__posterImage">
              <FluidImage
                src={posterImageUrl}
                role="presentation"
                ratio={imageHeight / imageWidth}
              />
              <figcaption>
                <span className="Content__posterImage-credit">
                  {content.posterImage.creditUrl
                    ? <a href={content.posterImage.creditUrl}>
                        {content.posterImage.creditTitle || 'Credit'}
                      </a>
                    : <span>
                        {content.posterImage.creditTitle}
                      </span>}
                </span>
              </figcaption>
            </figure>
            <div className="Content__body">
              <Document
                document={content.document}
                resources={mapValues(content.resources, (resources, key) =>
                  keyBy(
                    resources,
                    key === 'lowdowninteractives' ? 'slug' : 'id'
                  )
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
          standfirst
          tone
          authors {
            id
            name
            slug
          }
          form
          slug
          document
          posterImage {
            resourceName
            creditTitle
            creditUrl
            width
            height
          }
          resources {
            lowdownimages {
              id
              resourceName
              width
              height
              creditTitle
              creditUrl
            }
            lowdowninteractives {
              slug
              releaseNumber
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
