import React from 'react';

const CommentItem = (props) => {
  return (
    <div  className="show answer-comment">
      <div className="show comment-header">
        <div className="show comment-author">{
          `${props.comment.author.first_name} ${props.comment.author.last_name}`
        }</div>
      <div className="show comment-date">{
          props.comment.created_at
        }</div>
      </div>
      <div className="show comment-body">
        {props.comment.body}
      </div>
    </div>
  );
};

export default CommentItem;
