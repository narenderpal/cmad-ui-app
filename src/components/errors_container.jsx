import React from 'react';
import {connect} from 'react-redux';

const Errors = (props) => {
  let renderErrors = null;
  if (props.errors) {
    renderErrors = props.errors.map(
      (error, idx) => (
        <li key={idx}>{error}</li>
      )
    );
  }
  return (
    <ul>
      {renderErrors}
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.session.errors
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Errors);
