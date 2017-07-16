import React from 'react';
import Modal from 'react-modal';
import {modalClose} from '../actions/modal_actions';
import {requestQuestion} from '../actions/questions_actions';
import {connect} from 'react-redux';
import {createAnswer} from '../util/answers_api_util.js';
import TopicsIndexItem from './topics/topics_index_item';

const customStyles = {
  content : {
    padding               : '48px 86px',
    width                 : '602px',
    margin                : '12px auto',
    position: 'fixed',
    top: 'initial',
    left: 'initial',
    right: 'initial',
    bottom: 'initial',
    maxHeight: 'calc(80% - 40px)',
    border: 'none',
    overflow: 'inherit',
    minHeight: '320px'
  },
  overlay: {
    backgroundColor    : 'rgba(0, 0, 0, 0.65)',
    zIndex             : 125,
    display : 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      question_id: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.modalClose();
  }

  handleSubmit(e) {
    //const questionId = +this.props.selectedQuestion.id;
    const questionId = this.props.selectedQuestion._id;
    const realThis = this;
    e.preventDefault();
    this.setState({question_id: questionId}, () => {
      createAnswer(this.state)
        .then((response) => realThis.props.requestQuestion(questionId))
        //.then((response) => realThis.props.requestQuestion(response))
        .then(() => realThis.setState({body: ""}, () => realThis.props.modalClose()));
    });
  }

  handleChange(e) {
    this.setState({body: e.currentTarget.value});
  }

  render() {
    let modalTopic = null;
    if (this.props.selectedQuestion.topics) {
      const allTopics = this.props.selectedQuestion.topics;
      modalTopic = Object.values(allTopics).map(topic => {
        return (
          <TopicsIndexItem
            nameOfClass={"modal topic"}
            key={topic.id}
            topic={topic}
          />
        );
      });
    }

    return (
      <Modal
        isOpen={this.props.modalOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="modal close" onClick={this.closeModal}>&#x2715;</button>
        <div className="modal question">
          <div className="modal question-header">
            <ul onClick={this.closeModal} className="modal question-topics">
              {modalTopic}
            </ul>
          </div>
          <div className="modal question-title">
            {this.props.selectedQuestion.title}
          </div>
          <div className="modal question-body">
            {this.props.selectedQuestion.body}
          </div>
        </div>
        <form className="answer-form" onSubmit={this.handleSubmit}>
          <textarea
            className="answer-form-textarea"
            placeholder="Write your answer"
            onChange={this.handleChange}
          />
        <input className="button" type="submit" />
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    selectedQuestion: state.questions.selectedQuestion,
    modalOpen: state.modalOpen
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    modalClose: () => dispatch(modalClose()),
    requestQuestion: (id) => dispatch(requestQuestion(id))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerForm);
