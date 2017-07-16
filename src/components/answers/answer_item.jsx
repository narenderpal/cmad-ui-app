import React from 'react';
import CommentForm from '../comment_form';
import CommentItem from '../comments/comment_item';
import dateCalc from '../../util/date_calc';

const AnswerItem = (props) => {
  let renderComments = null;
  if (props.answer.comments) {
    const comments = props.answer.comments;
    renderComments =   Object.keys(comments).map(commentId => {
      return <CommentItem key={commentId} comment={comments[commentId]} />;
    }).reverse();
  }
  return (
    <div  className="show question-answer">
      <div className="show answer-header">
        <div className="show answer-author">{
          //`${props.answer.author.first_name} ${props.answer.author.last_name}`
          `${props.answer.author}`
        }</div>
        <div className="show answer-date">{
          dateCalc(props.answer.created_at)
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
