import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {requestTopic} from '../../actions/topics_actions';

const TopicsIndexItem = (props) => {
  return (
    <li className={props.nameOfClass}>
      <Link onClick={()=>props.requestTopic(props.topic.id)} to={`topics/${props.topic.id}`}>
        {props.topic.title}
      </Link>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => {
  return (
    {}
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {
      requestTopic: id => dispatch(requestTopic(id))
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicsIndexItem);
