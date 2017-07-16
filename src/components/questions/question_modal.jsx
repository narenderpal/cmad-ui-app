import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {clearQuestion} from '../../actions/questions_actions';
import {requestTopic} from '../../actions/topics_actions';
import {modalClose} from '../../actions/modal_actions';
import TopicsIndexItem from '../topics/topics_index_item';
import {Link} from 'react-router';
import dateCalc from '../../util/date_calc';

/*
The app element allows you to specify the portion of your app that should be hidden (via aria-hidden)
to prevent assistive technologies such as screenreaders from reading content outside of the content of
your modal.  It can be specified in the following ways:

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/

const customStyles = {
  content : {
    padding               : '48px 86px',
    width                 : '602px',
    margin                : 'auto',
    top: 'initial',
    left: 'initial',
    right: 'initial',
    bottom: 'initial',
    position: 'absolute',
    maxHeight: 'calc(80% - 40px)',
    border: 'none',
    overflowY: 'scroll'
  },
  overlay: {
    backgroundColor    : 'rgba(0, 0, 0, 0.65)',
    zIndex             : 125,
    display : 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};


class QuestionModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.props.clearQuestion();
  }

  render() {
    let modalAnswer = null;
    if (this.props.selectedQuestion.answers) {
      const answers = this.props.selectedQuestion.answers;
      modalAnswer =   answers[Object.keys(answers)[Object.keys(answers).length - 1]];
    }

    /*
    let modalTopic = null;
    if (this.props.selectedQuestion.tags) {
      const allTopics = this.props.selectedQuestion.tags;
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
      // copied from down before timestamp
              <ul onClick={this.closeModal} className="modal question-topics">
                {modalTopic}
              </ul>
    */

    return (
      <div>
        <Modal
          isOpen={this.props.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Question Modal"
        >
          <button className="modal close" onClick={this.closeModal}>&#x2715;</button>
          <div className="modal question">
            <div className="modal question-header">
              <div>
                {
                  modalAnswer ?
                  "Answer written" :
                  "Not yet answered"
                } &bull;
              </div>
              


              <div className="timestamp">
                {
                  modalAnswer ?
                  dateCalc(modalAnswer.created_at) :
                  null
                }
              </div>
              
              </div>
            <div className="modal question-title">
              <Link onClick={this.closeModal} to={`questions/${this.props.selectedQuestion.id}`}>
                {this.props.selectedQuestion.title}
              </Link>
            </div>
            <div className="modal question-body">
              {this.props.selectedQuestion.body}
            </div>
          </div>
          <div className="modal question-answer">
            <div className="modal question-answer-header">
              <div className="modal question-answer-author">
              {
                modalAnswer ?
                `${modalAnswer.author.first_name} ${modalAnswer.author.last_name}` :
                null
              }
              </div>
              <div className="modal question-answer-timestamp">
                {
                  modalAnswer ?
                  dateCalc(modalAnswer.created_at) :
                  null
                }
              </div>
            </div>
            <div className="modal question-answer-body">
            {
              modalAnswer ?
              modalAnswer.body :
              null
            }
            </div>
          </div>
        </Modal>
      </div>
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
    clearQuestion: () => dispatch(clearQuestion()),
    requestTopic: id => dispatch(requestTopic(id)),
    modalClose: () => dispatch(modalClose())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionModal);
