import PropTypes from 'prop-types';
import React from 'react';
import FrontHeroContent from './FrontHeroContent';

function FrontHeroTri(props) {
  return (
    <div className="FrontHeroTri FrontRow">
      <div className="FrontHeroTri__main">
        {props.content.hasOwnProperty(0)
          ? <FrontHeroContent main content={props.content[0]} />
          : null}
      </div>
      <div className="FrontHeroTri__secondary">
        {props.content.hasOwnProperty(1)
          ? <FrontHeroContent secondary content={props.content[1]} />
          : null}
        {props.content.hasOwnProperty(2)
          ? <FrontHeroContent secondary content={props.content[2]} />
          : null}
      </div>
    </div>
  );
}

FrontHeroTri.propTypes = {
  content: PropTypes.array.isRequired,
};

export default FrontHeroTri;
