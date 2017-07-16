import {
  RECEIVE_QUESTIONS,
  RECEIVE_QUESTION,
  CLEAR_QUESTION
} from '../actions/questions_actions';
// import {merge} from 'lodash';

const initialState = {
  allQuestions: {},
  selectedQuestion: {}
};

const questionsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, {allQuestions: action.questions});
    case RECEIVE_QUESTION:
      return Object.assign({}, state, {selectedQuestion: action.question});
    case CLEAR_QUESTION:
      return Object.assign({}, state, {selectedQuestion: {}});
    default:
      return state;
  }
};

export default questionsReducer;
