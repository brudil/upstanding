import PropTypes from 'prop-types';
import React from 'react';
import CadeSection from '../CadeSection';
import CadeGridContentCard from './CadeGridContentCard';

function CadeGrid(props) {
  return (
    <CadeSection>
      <ul className="CadeGrid">
        {props.content.map(content =>
          <li className="CadeGrid__item" key={content.id}>
            <CadeGridContentCard content={content} />
          </li>
        )}
      </ul>
    </CadeSection>
  );
}

CadeGrid.propTypes = {
  content: PropTypes.array.isRequired,
};

export default CadeGrid;
