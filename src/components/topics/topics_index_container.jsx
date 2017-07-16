import React from 'react';
import {connect} from 'react-redux';
import {requestTopics} from '../../actions/topics_actions';
import {requestQuestions} from '../../actions/questions_actions';
import TopicsIndexItem from './topics_index_item';
import {Link} from 'react-router';

class TopicsIndex extends React.Component {

  componentDidMount() {
    this.props.requestTopics();
  }

  render() {
    let allTopics = this.props.allTopics;
    if (!Object.keys(allTopics).length) {
      return (
        <div>loading...</div>
      );
    } else {
      allTopics = Object.values(allTopics).map(topic => {
        return (<TopicsIndexItem nameOfClass={"topic-item"} key={topic.id} topic={topic} />);
      });
    }
    return (
      <div className="topics-box">
        <h2>Menu</h2>
        <ul>
          <li className="topic-item">
            <a onClick={this.props.requestQuestions} href="/#">All Questions</a>
          </li>
          {allTopics}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return ({
    allTopics: state.topics.allTopics
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    requestTopics: () => dispatch(requestTopics()),
    requestQuestions: () => dispatch(requestQuestions())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicsIndex);
