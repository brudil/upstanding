import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import { setContent } from '../../../core/actions';
import Document from '../components/Spectrum/Document';
import Byline from '../components/Byline';
import LoadingIndicator from '../components/LoadingIndicator';
import Headline from '../components/Headline';
import FluidImage from '../components/FluidImage';
import { imgixURL } from '../../../core/components/utils';
import ErrorPage from '../../../core/components/ErrorPage';

class ContentPage extends React.Component {
  componentWillMount() {
    this.props.setContent(this.props.routeParams.contentId);
  }

  render() {
    const { content, isLoading, didFailToLoad } = this.props;

    if (didFailToLoad) {
      return <ErrorPage statusCode={didFailToLoad} />;
    }

    if (isLoading || content === undefined) {
      return <LoadingIndicator />;
    }

    const imageHeight = 400;
    const imageWidth = 880;
    const posterImageUrl = imgixURL(content.poster_image.resource_name, {
      w: imageWidth,
      h: imageHeight,
    });

    return (
      <div className="Main">
        <Helmet title={content.headline} />
        <div className="ContentPage Container">
          <Headline headline={content.headline} />
          <div className="Content__metadata-m">
            <span>Written by </span>
            <Byline
              className="ContentHeader__byline"
              authors={content.authors}
            />
            <span> / </span>
            <TimeAgo date={content.published} />
          </div>

          <div className="ContentPage__primary">
            <FluidImage
              src={posterImageUrl}
              role="presentation"
              ratio={imageHeight / imageWidth}
            />
            <div className="Content">
              <div className="Content__metadata">
                <dl className="Content__metadata-list">
                  <dt>Written by</dt>
                  <dd>
                    <Byline
                      className="ContentHeader__byline"
                      authors={content.authors}
                    />
                  </dd>
                  <dt>Published</dt>
                  <dd>
                    <TimeAgo date={content.published} />
                  </dd>
                  <dt>Section</dt>
                  <dd>
                    {content.section.title}
                  </dd>
                </dl>
              </div>
              <div className="Content__body">
                <Document document={content.spectrum_document} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContentPage.propTypes = {
  setContent: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  content: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
  didFailToLoad: React.PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setContent,
    },
    dispatch
  );
}

export default connect(
  (state, props) => ({
    isLoading: state.content.isLoading,
    didFailToLoad: state.content.failedLoads[props.params.contentId],
    content: state.entities.content[props.params.contentId],
  }),
  mapDispatchToProps
)(ContentPage);
