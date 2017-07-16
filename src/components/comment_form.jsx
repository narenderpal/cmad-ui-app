import React from 'react';
import {connect} from 'react-redux';
import {createComment} from '../util/comments_api_util.js';
import {requestQuestion} from '../actions/questions_actions';


class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  initialState () {
    return (
      {
        body: "",
        answer_id: +this.props.answerId
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let theDiv = e.target.childNodes[0];
    const realThis = this;
    this.setState({body: theDiv.innerText}, () => {
      createComment(this.state)
        .then(questionId => realThis.props.requestQuestion(questionId))
        .then(()=> realThis.setState(realThis.initialState(), ()=> {
          theDiv.innerText = "";
        }));
    });
  }

  handleChange(e) {
    this.setState({body: e.currentTarget.value});
  }

  render(){
    return (
      <div className="comment-form-box">
        <form
          className="comment-form"
          onSubmit={this.handleSubmit}
        >
          <div
            contentEditable="true"
            className="comment-form-textarea"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder=""
          ></div>
          <input type="submit" value="Comment" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return (
    {

    }
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {
      requestQuestion: questionId => dispatch(requestQuestion(questionId))
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
