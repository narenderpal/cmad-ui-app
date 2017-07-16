/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Title from './Title';
//import Directory from './Directory';
import Questions from './Questions';


ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Title />, document.getElementById('title'));
//ReactDOM.render(<Directory />, document.getElementById('directory'));
ReactDOM.render(<Questions />, document.getElementById('questions'));

*/

import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.css';
import './stylesheets/splash_auth.css';
import './stylesheets/question_show.css';
import './stylesheets/application.css';
import configureStore from './store/store';
import Root from './components/root';

import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {session: {currentUser: window.currentUser}};
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});

