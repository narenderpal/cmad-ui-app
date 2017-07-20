import {connect} from 'react-redux';
import { logout } from '../actions/session_actions';

import React from 'react';
import { Link } from 'react-router';


class Greeter extends React.Component {

  render () {
    if (this.props.currentUser) {
      return (
        <div className="user-options">
          Welcome {this.props.currentUser.firstName}
          <a href="#" className="button" onClick={this.props.logout}>Log out</a>
        </div>
      );
    } else {
      return (
        <div>
          not signed in
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  //logout: () => dispatch(logout(this.props.currentUser.firstName))
  logout: () => dispatch(logout("napal"))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeter);
