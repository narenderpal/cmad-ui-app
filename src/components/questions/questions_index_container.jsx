import React from 'react';
import {connect} from 'react-redux';
import {requestQuestions, clearQuestion} from '../../actions/questions_actions';
import {requestTopic} from '../../actions/topics_actions';
import QuestionsIndexItem from './questions_index_item';
import QuestionModal from './question_modal';

class QuestionsIndex extends React.Component {

  componentDidMount() {
    if (this.props.routeParams.topicId){
      this.props.requestTopic(this.props.routeParams.topicId);
    }
    this.props.requestQuestions(this.props.params.topicId)
      .then(this.props.clearQuestion());
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="questions-box" style={{ opacity: 0.5 }}>
          <h2>{this.props.routeParams.topicId ?
              (this.props.selectedTopic.title ? `${this.props.selectedTopic.title}` : "Top Questions") :
              "Top Questions" }</h2>
          <div className="loader"></div>
          <div id="question-modal loader">
            <QuestionModal/>
          </div>
        </div>
      );
    }
    let allQuestions = this.props.allQuestions;
    if (!Object.keys(allQuestions).length) {
      allQuestions = (
        <div>{"No questions for this topic."}</div>
      );
    } else {
      allQuestions = Object.values(allQuestions).map(question => {
        if(question.title) {
          return (<QuestionsIndexItem key={question._id} question={question} />);
        }
      }).reverse();
    }
    return (
      <div className="questions-box">
          <h2>{this.props.routeParams.topicId ?
              (this.props.selectedTopic.title ? `${this.props.selectedTopic.title}` : "Top Questions") :
              "Top Questions" }</h2>
          {allQuestions}
          <div id="question-modal">
            <QuestionModal/>
          </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return ({
    allQuestions: state.questions.allQuestions,
    selectedTopic: state.topics.selectedTopic,
    loading: state.loading
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    requestQuestions: topicId => dispatch(requestQuestions(topicId)),
    clearQuestion: () => dispatch(clearQuestion()),
    requestTopic: topicId => dispatch(requestTopic(topicId))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsIndex);
