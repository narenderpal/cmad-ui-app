import {connect} from 'react-redux';
import UserForm from './user_form';
import {signup, clearErrors} from '../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
      loggedIn: state.session.currentUser ? true : false,
      errors: state.session.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
