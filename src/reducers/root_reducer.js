import sessionReducer from './session_reducer';
import topicsReducer from './topics_reducer';
import questionsReducer from './questions_reducer';
import modalReducer from './modal_reducer';
import loaderReducer from './loader_reducer';
// import benchesReducer from './benches_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  session: sessionReducer,
  topics: topicsReducer,
  questions: questionsReducer,
  modalOpen: modalReducer,
  loading: loaderReducer
  // benches: benchesReducer
});

export default rootReducer;
