import * as topicsAPIUtil from '../util/topics_api_util';
import {requestQuestions} from './questions_actions';

export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const CLEAR_TOPIC = 'CLEAR_TOPIC';

export const receiveTopics = (topics) => ({
  type: RECEIVE_TOPICS,
    topics
});

export const receiveTopic = (topic) => ({
  type: RECEIVE_TOPIC,
    topic
});

export const clearTopic = () => ({
  type: CLEAR_TOPIC
});

export const requestTopics = () => dispatch => {
  return topicsAPIUtil.getTopics()
    .then((topics) => dispatch(receiveTopics(topics))
  );
};

export const requestTopic = (id) => dispatch => {
  return topicsAPIUtil.getTopic(id)
    .then(topic => {
      dispatch(receiveTopic(topic));
      dispatch(requestQuestions(topic.id));
    }
  );
};

export const createTopic = (topic) => dispatch => {
  return topicsAPIUtil.createTopic(topic)
    .then((topic) => dispatch(receiveTopic(topic))
  );
};
