import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFront } from '../../../core/ducks/Fronts';
import FrontContainer from '../components/FrontContainer';
import LoadingIndicator from '../components/LoadingIndicator';

class HomePage extends React.Component {
  componentWillMount() {
    this.props.setFront('front');
  }

  render() {
    const { data, isLoading } = this.props;
    if (isLoading || !data) {
      return <LoadingIndicator />;
    }

    return (
      <div className="Main">
        <FrontContainer title="Latest" content={data} />
      </div>
    );
  }
}

HomePage.propTypes = {
  setFront: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const key = 'front';

  if (!state.fronts.map.hasOwnProperty(key)) {
    return { isLoading: true };
  }
  const frontData = state.fronts.map[key];
  return {
    ...frontData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFront,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
