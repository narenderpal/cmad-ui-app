import React from 'react';
import { connect } from 'react-redux';

const TopicShow = props => {
  return (
    <div>
      SHOWING TOPIC!
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return (
    {topic: state.topics.selectedTopic}
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return (
    {}
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicShow);
