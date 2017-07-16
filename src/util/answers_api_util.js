import $ from 'jquery';

export const getAnswers = (questionId) => {
  return $.ajax({
    method: "GET",
    url: "api/answers",
    data: {questionId}
  });
};

export const getAnswer = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/answers/${id}`
  });
};

export const createAnswer = (answer) => {
  const questionId = answer.question_id;
  return $.ajax({
    method: "POST",
    url: `http://35.197.43.248:80/api/v1/question/${questionId}/answer`,
    data: JSON.stringify({
      body: answer.body,
      //create_at: 'current_date_time',
      author: "Jack"}),
    contentType: 'application/json',
    dataType: 'json'
  });


};

export const updateAnswer = (answer) => {
  return $.ajax({
    method: "PUT",
    //url: `http://35.197.43.248:80/api/v1/question/${id}/answer/${answerId}`,
    url: `api/answers/answer`,
    data: { answer }
  });
};
