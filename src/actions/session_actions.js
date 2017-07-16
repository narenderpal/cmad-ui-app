import * as sessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const signup = (user) => (dispatch) => {
  return sessionAPIUtil.signup(user)
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const login = (user) => (dispatch) => {
  return sessionAPIUtil.login(user)
    .then(
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const logout = () => (dispatch) => {
  return sessionAPIUtil.logout()
    .then(
      () => dispatch(receiveCurrentUser(null)),
      (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERROR,
    errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
