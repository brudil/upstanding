import PropTypes from 'prop-types';
import React from 'react';
import CadeSection from '../CadeSection';
import CadeHeroContent from './CadeHeroContent';

function CadeHero(props) {
  return (
    <CadeSection>
      {props.content.hasOwnProperty(0)
        ? <CadeHeroContent main content={props.content[0]} />
        : null}
    </CadeSection>
  );
}

CadeHero.propTypes = {
  content: PropTypes.array.isRequired,
};

export default CadeHero;
