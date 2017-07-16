import {connect} from 'react-redux';
import { logout } from '../actions/session_actions';

import React from 'react';
import { Link } from 'react-router';


class DevDisplay extends React.Component {

  render () {
    return (
      <div className="debug-info">
        {JSON.stringify(this.props.state)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevDisplay);
