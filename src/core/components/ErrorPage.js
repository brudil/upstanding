import React from 'react';

function ErrorPage(props) {
  const { statusCode, textMap } = props;

  const text = textMap.hasOwnProperty(statusCode)
    ? textMap[statusCode]
    : textMap.internalServer;

  return (
    <div className="Main">
      <div className="Stonewall">
        <h1 className="Stonewall__title">
          {text.title}
        </h1>
        <p className="Stonewall__detail">
          {text.detail}
        </p>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  statusCode: React.PropTypes.number.isRequired,
  textMap: React.PropTypes.object.isRequired,
};

ErrorPage.defaultProps = {
  textMap: {
    404: {
      title: 'f*#k oh, f!*k',
      detail: "This page can't be found.",
    },
    500: {
      title: 'not you, me',
      detail:
        'A fatal error occurred. We would punish who is responsible, but as mentioned, it was fatal.',
    },
    999: {
      title: 'broken here, broken now',
      detail:
        "Something broke while trying to make this page for you. We've been alerted, as have the cyberpolice.",
    },
  },
};

export default ErrorPage;
