import {
  MODAL_CLOSE,
  MODAL_OPEN
} from '../actions/modal_actions';


const modalReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case MODAL_CLOSE:
      return false;
    case MODAL_OPEN:
      return true;
    default:
      return state;
  }
};

export default modalReducer;
