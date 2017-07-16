import React from 'react';
import {connect} from 'react-redux';
import {createQuestion, requestQuestion, requestQuestions} from '../../actions/questions_actions';
import {requestTopic} from '../../actions/topics_actions';
import {searchQuestions} from '../../util/questions_api_util';
import GreeterContainer from '../greeter_container';
import {Link, hashHistory} from 'react-router';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: "", body: "", topic_ids: [], searchResults: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleAsk = this.handleAsk.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.askFocused = false;
  }

  handleChange(field) {
    return e => {
      const realThis = this;
      this.setState({[field]: e.target.value}, () => searchQuestions(this.state.title)
        .then(questions => {
          if( Object.prototype.toString.call( questions ) === "[object Array]" ) {
            realThis.setState({searchResults: questions});
          } else {
            realThis.setState({searchResults: []});
          }
        })
      );
    };
  }

  handleAsk(e){
    e.preventDefault();
    const realThis = this;
    if (this.props.topic) {
      this.topicId = this.props.topic.id;
    }
    const topics = [this.topicId];
    this.setState({topic_ids: topics}, () => {
      realThis.props.askQuestion(realThis.state)
        .then(question => hashHistory.push(`/questions/${realThis.props.question.id}`));
      realThis.setState({title: "", searchResults: []});
    });
  }

  handleLinkClick(questionId) {
    return e => {
      this.setState({searchResults: []});
      this.props.requestQuestion(questionId).then(hashHistory.push(`questions/${questionId}`));
    };
  }

  handleBlur(e) {
    setTimeout(() => this.setState({searchResults: []}), 100);
  }

  render() {
    let renderResults = null;
    if (this.state.searchResults.length > 0) {
      renderResults = this.state.searchResults.map((result, idx) => {
        return (
          <div key={idx} className="search-result">
            <Link onMouseDown={this.handleLinkClick(result[0])}
              to={`questions/${result[0]}`}
            >
              {result[1]}
            </Link>
          </div>
        );
      });
    }
    return (
      <div className="navbar-outer">
        <div className="navbar">
          <div className="navbar-logo">
            <Link onClick={() => this.props.requestQuestions()} to="/">
              QA App
            </Link>
          </div>
          <div className="navbar-contents">
            <div className="ask-box">
              <form className="ask-form" onFocus={() => this.askFocused = true} onSubmit={this.handleAsk}>
                <input
                  type="text"
                  className="ask-title"
                  placeholder={this.props.topic.title ?
                    `Ask in ${this.props.topic.title} or Search` :
                    "Ask or Search"}
                  value={this.state.title}
                  onBlur={() => this.handleBlur()}
                  onFocus={this.handleChange("title")}
                  onChange={this.handleChange("title")}
                />
                <input
                  type="submit"
                  className="button"
                  value="Ask Question"
                />
                <div
                  className={this.state.searchResults.length > 0 ?
                    "ask-search-results" :
                    "ask-search-results hidden"
                  }
                  value={this.state.body}
                  onChange={this.handleChange("body")}
                >
                  {renderResults}
                </div>
              </form>
            </div>
            

            
            <div className="inactive-page">
              <Link to="/">Answer</Link>
            </div>
            <div className="inactive-page">
              <Link to="/">Notifications</Link>
            </div>
            <GreeterContainer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    topic: state.topics.selectedTopic,
    question: state.questions.selectedQuestion
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {
      askQuestion: question => dispatch(createQuestion(question)),
      requestQuestion: id => dispatch(requestQuestion(id)),
      requestQuestions: id => dispatch(requestQuestions(id)),
      requestTopic: (topicId) => dispatch(requestTopic(topicId))
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
