import React from 'react';
import {connect} from 'react-redux';
import {requestQuestion, deleteQuestion, updateQuestion} from '../../actions/questions_actions';
import {requestTopic} from '../../actions/topics_actions';
import {getTopics} from '../../util/topics_api_util';
import {modalOpen, modalClose} from '../../actions/modal_actions';
import TopicsIndexItem from '../topics/topics_index_item';
import AnswerForm from '../answer_form';
import AnswerItem from '../answers/answer_item';
import {Link} from 'react-router';

class QuestionShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      topic_ids: [],
      title: "",
      body: "",
      editMode: false,
      author: "",
      //_id:"",
      //description:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.topicOptions = null;
  }

  componentDidMount() {
    const realThis = this;
    this.props.requestQuestion(this.props.params.questionId)
      .then(question => {
        realThis.setState({
          title: realThis.props.selectedQuestion.title,
          id: +realThis.props.selectedQuestion._id,
          body: realThis.props.selectedQuestion.body,
          author: realThis.props.selectedQuestion.author,
          topic_ids: (realThis.props.selectedQuestion.tags ?
            [Object.keys(realThis.props.selectedQuestion.tags)[0]] :
            []),
          //_id: +realThis.props.selectedQuestion._id,
          //description: +realThis.props.selectedQuestion.description,
        });
        this.props.modalClose();
      });
  }

  handleChange(field) {
    return e => {
      if (field === "topic_ids") {
        if (e.currentTarget.value === "") {
          this.setState({[field]: []});
        } else {
          this.setState({[field]: [e.currentTarget.value]});
        }
      } else {
        this.setState({[field]: e.currentTarget.value});
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const realThis = this;
    this.props.updateQuestion(this.state)
      .then(question => realThis.setState({editMode: false}));
  }

  render() {
    let questionShowAnswer = null;
    if (this.props.selectedQuestion.answers) {
      const answers = this.props.selectedQuestion.answers;
      questionShowAnswer =   Object.keys(answers).map(answerId => {
        return <AnswerItem key={answerId} answer={answers[answerId]} />;
      }).reverse();
    }

    let questionShowTopic = null;
    if (this.props.selectedQuestion.topics) {
      const allTopics = this.props.selectedQuestion.topics;
      questionShowTopic = Object.values(allTopics).map(topic => {
        return (
          <TopicsIndexItem
            nameOfClass={"topic"}
            key={topic.id}
            topic={topic}
          />
        );
      });
    }

    const renderQuestion = (
      <div>
        <div className="show question-header">
          <div>
            {
              questionShowAnswer ?
              "Answer written" :
              "Not yet answered"
            } &bull;
          </div>
          <ul className="show question-topics">
            {questionShowTopic}
          </ul>
        </div>
        <div className="show question-title">
          {this.props.selectedQuestion.title}
        </div>
        <div className="show question-body">
          {this.props.selectedQuestion.body}
        </div>
      </div>
    );

    const realThis = this;
    getTopics().then(topics => {
      // this.state.items.map(item=><li key={item._id}>{item.description}</li>) : <li>Loading...</li>

      realThis.topicOptions = topics.map(topic => {
        return (
            <option key={topic._id} value={topic._id}>{topic.tags[0]}</option>
          );
      });
    });
    const editQuestion = (
      <div>
        <form className="question-edit" onSubmit={this.handleSubmit}>
          <lable className="edit-lable">Topic:</lable>
          <select className="topic-select" value={this.state.topics_id ? this.state.topics_id[0] : ""} name="" onChange={this.handleChange("topic_ids")}>
            <option value="none">none</option>
            {this.topicOptions}
          </select>
          <lable className="edit-lable">Question:</lable>
          <textarea className="edit-title" value={this.state.title} onChange={this.handleChange("title")}/>
          <lable className="edit-lable">Details:</lable>
          <textarea className="edit-body" value={this.state.body ? this.state.body : ""} onChange={this.handleChange("body")}/>
          <input className="button answer" type="submit" value="Update" />
        </form>
      </div>
    );

    const editButton = (
      <button className="button edit" onClick={() => this.setState({editMode: true})}>
        Edit
      </button>
    );

    const deleteButton = (
      <button className="button delete" onClick={() => this.props.deleteQuestion(+this.props.selectedQuestion.id).then(()=>this.props.router.push("/"))}>
        Delete
      </button>
    );

    return (
      <div className="show question">
        <div className="show question-proper">
          {this.state.editMode ? editQuestion : renderQuestion}
          <div className="show question-answer-prompt">
            <div>
            <button className="button answer" onClick={() => this.props.modalOpen()}>
              Answer
            </button>
            {this.props.selectedQuestion.userIsAuthor ? editButton : null}
          </div>
            <div>
              {this.props.selectedQuestion.userIsAuthor ? deleteButton : null}
          </div>
          </div>
        </div>
        <div className="show question-all-answers">
          {questionShowAnswer}
        </div>
        <AnswerForm />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return (
    {
      selectedQuestion: state.questions.selectedQuestion
    }
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {
      requestQuestion: id => dispatch(requestQuestion(id)),
      updateQuestion: question => dispatch(updateQuestion(question)),
      deleteQuestion: id => dispatch(deleteQuestion(id)),
      requestTopic: id => dispatch(requestTopic(id)),
      modalOpen: () => dispatch(modalOpen()),
      modalClose: () => dispatch(modalClose())
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionShow);
