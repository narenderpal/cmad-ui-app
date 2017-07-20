import React from 'react';
import {connect} from 'react-redux';
import {requestQuestion} from '../../actions/questions_actions';
import {modalOpen} from '../../actions/modal_actions';
import {Link} from 'react-router';
import dateCalc from '../../util/date_calc';

class QuestionsIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.className !== "question-index-link") {
      this.props.requestQuestion(this.props.question.id)
        .then(this.props.modalOpen());
    }
  }

  render() {
    const answer = this.props.question.answer
    let body = null;
    if (answer) {
      body = answer.body.split(" ");
      if (body.length > 34) {
        body = body.slice(0, 34).join(" ") + "...";
      } else {
        body = answer.body;
      }
    }
    let renderAnswer = null;
    if (answer) {
      renderAnswer = (
        <div className="answer-box">
          <div className="answer-author">
            Answered by {answer.author}
            <div className="show answer-date">{dateCalc(answer.created_at)}</div>
          </div>
          <div className="answer-body">
            {body}
          </div>
        </div>
      );
    }
    const topic = this.props.question.topic;
    let renderTopic = null;
    if (topic) {
      renderTopic = (
        <div className="topic-box">
          {topic.title}
        </div>
      );
    }
    return (
      <div
        onClick={this.handleClick}
        className="question-individual-box"
      >
        <div className="question-individual-header">
          {renderTopic}
        </div>
        <div className="question-title">
          <Link className="question-index-link" to={`questions/${this.props.question._id}`}>
            {this.props.question.title}
          </Link>
          
        </div>
        <div className="modal question-body">
              {this.props.question.body}
        </div>
        {renderAnswer}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
 return ({});
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {
      requestQuestion: questionId => dispatch(requestQuestion(questionId)),
      modalOpen: () => dispatch(modalOpen())
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsIndexItem);
