import PropTypes from 'prop-types';
import React from 'react';

function CadeSection(props) {
  return (
    <section className="CadeSection">
      {props.title
        ? <h2 className="CadeSection__title">
            {props.title}
          </h2>
        : null}
      {props.children}
    </section>
  );
}

CadeSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CadeSection;
