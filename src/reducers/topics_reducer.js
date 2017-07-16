import {
  RECEIVE_TOPICS,
  RECEIVE_TOPIC,
  CLEAR_TOPIC
} from '../actions/topics_actions';

const initialState = {
  allTopics: {},
  selectedTopic: {}
};

const topicsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOPICS:
      return Object.assign({}, state, {allTopics: action.topics});
    case RECEIVE_TOPIC:
      return Object.assign({}, state, {selectedTopic: action.topic});
    case CLEAR_TOPIC:
      return Object.assign({}, state, {selectedTopic: {}});
    default:
      return state;
  }
};

export default topicsReducer;
