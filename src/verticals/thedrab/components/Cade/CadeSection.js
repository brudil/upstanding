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
  title: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
};

export default CadeSection;
