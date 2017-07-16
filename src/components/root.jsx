import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import TopicShow from './topics/topic_show';
import QuestionsIndexContainer from './questions/questions_index_container';
import TopicsIndexContainer from './topics/topics_index_container';
import QuestionShow from './questions/question_show';

const Root = ({store}) => {

  const _redirectToAuth = (nextState, replace) => {
    if (!store.getState().session.currentUser) {
      replace('/');
    }
  };

  const _redirectToFeed = (nextState, replace) => {
    if (store.getState().session.currentUser) {
      replace('/feed');
    }
  };

  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={ App }>
          <IndexRoute components={{topicIndex: TopicsIndexContainer, questionIndex: QuestionsIndexContainer}} />
          <Route path='/topics/:topicId' onEnter={ _redirectToAuth } components={{topicIndex: TopicsIndexContainer, questionIndex: QuestionsIndexContainer}}  />
          <Route path='/questions/:questionId' onEnter={ _redirectToAuth } component={QuestionShow}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
