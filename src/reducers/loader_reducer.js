import {
  RECEIVE_QUESTIONS,
  RECEIVE_QUESTION,
  CLEAR_QUESTION,
  START_LOADING
} from '../actions/questions_actions';
// import {merge} from 'lodash';


const loaderReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case START_LOADING:
      return true;
    case RECEIVE_QUESTIONS:
      return false;
    case RECEIVE_QUESTION:
      return false;
    case CLEAR_QUESTION:
      return false;
    default:
      return state;
  }
};

export default loaderReducer;
