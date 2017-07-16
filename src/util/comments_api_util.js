import $ from 'jquery';

export const getComments = (answerId) => {
  return $.ajax({
    method: "GET",
    url: "api/comments",
    data: {answerId}
  });
};

export const getComment = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/comments/${id}`
  });
};

export const createComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: "api/comments",
    data: { comment }
  });
};

export const updateComment = (comment) => {
  return $.ajax({
    method: "PATCH",
    url: `api/comments/${comment.id}`,
    data: { comment }
  });
};
