import React from 'react';
import { connect } from 'react-redux';
import SessionFormContainer from './session_form_container';
import UserFormContainer from './user_form_container';
import ErrorsContainer from './errors_container';

class Auth extends React.Component{

  render() {
    return (
      <div className="auth-box">
        <div className="hero-text">
          <div className="logo">CMAD QA APP</div>
          <h4>A question and answer application built on React, Redux frontend, Vert.x Cloud Microservices on the backend and a Mongo database. 
</h4>
        </div>
        <ErrorsContainer />
        <div className="hero-forms">
          <UserFormContainer />
          <SessionFormContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return (
    {currentUser: state.session.currentUser}
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {}
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
