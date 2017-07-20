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
      //allTopics = Object.values(allTopics).map(topic => {
      allTopics = Object.values(tags).map(topic => {
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

const tags = {  
   "111":{  
      "id":111,
      "title":"java"
   },
   "112":{  
      "id":112,
      "title":"Javascript"
   },
   "113":{  
      "id":113,
      "title":"Python"
   },
   "114":{  
      "id":114,
      "title":"angularjs"
   },
   "115":{  
      "id":115,
      "title":"Misc"
   }
};

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
