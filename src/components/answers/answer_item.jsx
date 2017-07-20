import React from 'react';
import CommentForm from '../comment_form';
import CommentItem from '../comments/comment_item';
import dateCalc from '../../util/date_calc';

const AnswerItem = (props) => {
  let renderComments = null;
  let answeredBy = props.answer.author;
  if (props.answer.comments) {
    const comments = props.answer.comments;
    renderComments =   Object.keys(comments).map(commentId => {
      return <CommentItem key={commentId} comment={comments[commentId]} />;
    }).reverse();
  }
  return (
    <div  className="show question-answer">
      <div className="show answer-header">
        <div className="show answer-date">
          {answeredBy} Answered
        </div>
        <div className="show answer-date">{
          props.answer.created_at ?
          dateCalc(props.answer.created_at) : "1 week ago"
        }</div>
      </div>
      <div className="show answer-body">
        {props.answer.body}
      </div>
      <div className="comments-box">
        <CommentForm answerId={props.answer._id}/>
        {renderComments}
      </div>
    </div>
  );
};

export default AnswerItem;
