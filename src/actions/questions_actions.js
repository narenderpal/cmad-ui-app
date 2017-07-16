import * as questionsAPIUtil from '../util/questions_api_util';
import {clearTopic} from './topics_actions';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const START_LOADING = 'START_LOADING';

export const startLoadingQuestions = (questions) => ({
  type: START_LOADING
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
    questions
});

export const receiveQuestion = (question) => ({
  type: RECEIVE_QUESTION,
    question
});

export const clearQuestion = () => ({
  type: CLEAR_QUESTION
});

export const requestQuestions = (topicId) => dispatch => {
  dispatch(startLoadingQuestions());
  return questionsAPIUtil.getQuestions(topicId)
  .then((questions) => {
    dispatch(receiveQuestions(questions));
  });
};

// export const searchQuestions = (query) => dispatch => {
//   return questionsAPIUtil.searchQuestions(query)
//   .then((questions) => dispatch(receiveQuestions(questions)));
// };

export const requestQuestion = (id) => dispatch => {
  dispatch(startLoadingQuestions());
  return questionsAPIUtil.getQuestion(id)
  .then((question) => dispatch(receiveQuestion(question)));
};

export const deleteQuestion = (id) => dispatch => {
  return questionsAPIUtil.deleteQuestion(id)
  .then((question) => dispatch(clearQuestion(question)));
};

export const createQuestion = (question) => dispatch => {
  return questionsAPIUtil.createQuestion(question)
    .then((question) => {
      dispatch(receiveQuestion(question));
      if (question._id) {
        dispatch(requestQuestions(question._id));
      } else {
        dispatch(requestQuestions());
      }
    }
  );
};

export const updateQuestion = (question) => dispatch => {
  return questionsAPIUtil.updateQuestion(question)
  .then((response) => dispatch(requestQuestion(response.id)));
};
