import React from 'react';
import { Helmet } from 'react-helmet-async';
import gql from 'graphql-tag';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import Document from '../components/Spectrum/Document';
import Byline from '../components/Byline';
import { OneImage, AspectRatio } from '../../../core/components/OneImage';
import { imgixURL } from '../../../core/components/utils';
import getPathForContent from '../utils/getPathForContent';
import RelatedContent from './RelatedContent';
import social, { openSocial } from '../../../core/utils/social';

class ContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenSocial = this.handleOpenSocial.bind(this);
  }

  handleOpenSocial(e) {
    e.preventDefault();

    openSocial(e.currentTarget.href);
  }

  render() {
    const { content, container, preview = false } = this.props;
    const imageHeight = 400;
    const imageWidth = 880;
    const posterImageUrl = imgixURL(content.posterImage.resourceName, {
      w: imageWidth,
      h: imageHeight,
    });

    const getPrep = (index, total) => {
      if (index <= 0) {
        return '';
      }

      return index <= total - 1 ? ' and ' : ', ';
    };
    const authorsString = content.authors.map(
      (author, index) =>
        `${getPrep(index, content.authors.length)}${author.name}`
    );

    const contentPath = preview ? '' : getPathForContent(container);

    const subtype = content.document.content._name;

    const hidePosterImage =
      subtype === 'canvas_subtype' &&
      ['CANVAS', 'CONTAINER'].indexOf(content.document.content.viewMode) !== -1;

    const hideMetadata =
      subtype === 'canvas_subtype' &&
      ['CANVAS'].indexOf(content.document.content.viewMode) !== -1;

    return (
      <div className="Main">
        <Helmet title={content.shortHeadline} encodeSpecialCharacters={false}>
          <meta
            property="og:url"
            content={`https://thedrab.co${contentPath}`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content={`https://thedrab.co/external/ogimage/${container.contentId}/`}
          />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:title" content={content.shortHeadline} />
          <meta property="og:description" content={content.standfirst} />
          <meta property="description" content={content.standfirst} />
          <meta property="author" content={authorsString.join('')} />
        </Helmet>
        <div className="ContentPage Container">
          <article className="ContentPage__article">
            {hideMetadata ? null : (
              <div className="Content__meta">
                <div className="Content__kicker">{content.kicker}</div>
                <h1 className="Content__title">{content.headline}</h1>
                <div className="Content__meta">
                  <Byline
                    className="ContentHeader__byline"
                    authors={content.authors}
                    publishedDate={container.publishedDate}
                  />
                </div>
              </div>
            )}
            {hidePosterImage ? null : (
              <figure className="Content__posterImage">
                <OneImage
                  src={content.posterImage.resourceName}
                  role="presentation"
                  aspectRatio={AspectRatio.r20by9}
                  alt=""
                />
                <figcaption>
                  <span className="Content__posterImage-credit">
                    {content.posterImage.creditUrl ? (
                      <a href={content.posterImage.creditUrl}>
                        {content.posterImage.creditTitle || 'Credit'}
                      </a>
                    ) : (
                      <span>{content.posterImage.creditTitle}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            )}
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
          <div className="ContentPage__social">
            <div className="ContentPage__social-inner">
              <p>Feed your content hungry friends</p>
              <a
                className="ContentPage__social-button ContentPage__social-button--twitter"
                onClick={this.handleOpenSocial}
                href={social.twitter(
                  content.headline,
                  `https://thedrab.co${contentPath}`
                )}
              >
                Tweet
              </a>
              <a
                className="ContentPage__social-button ContentPage__social-button--facebook"
                onClick={this.handleOpenSocial}
                href={social.facebook(`https://thedrab.co${contentPath}`)}
              >
                Share
              </a>
            </div>
          </div>
          {container.contentId >= 0 ? (
            <RelatedContent contentId={container.contentId} />
          ) : null}
        </div>
      </div>
    );
  }
}

ContentPage.fragments = {
  ContentPage: gql`
    fragment ContentPage on ContentContent {
      headline
      shortHeadline
      kicker
      standfirst
      tone
      authors {
        id
        name
        slug
      }
      form
      channel
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
  `,
};

export default ContentPage;
