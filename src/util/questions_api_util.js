import $ from 'jquery';

export const getQuestions = (topicId) => {
  return $.ajax({
    method: "GET",
    //url: "api/questions",
    url: "http://35.197.43.248:80/api/v1/question",
    //data: {topicId}
    dataType: 'json',
    cache: true
  });
};

export const getQuestion = (id) => {
  return $.ajax({
    method: "GET",
    //url: `api/questions/${id}`
    url: `http://35.197.43.248:80/api/v1/question/${id}`
  });
};

export const deleteQuestion = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `http://35.197.43.248:80/api/v1/question/${id}`
  });
};

export const createQuestion = (question) => {
  const questionTitle = question.title;
  return $.ajax({
    method: "POST",
    url: `http://35.197.43.248:80/api/v1/question`,
    data: JSON.stringify({
      title: questionTitle,
      body: questionTitle,
      tags:["Misc"],
      //create_at: 'current_date_time',
      author: "napal"}),
    contentType: 'application/json',
    dataType: 'json'
  });
};

export const updateQuestion = (question) => {
  return $.ajax({
    method: "PUT",
    url: `http://35.197.43.248:80/api/v1/question/${question.id}`,
    data: { question }
  });
};

export const searchQuestions = (query) => {
  return $.ajax({
    method: "GET",
    url: `http://35.197.43.248:80/api/v1/question`,
    data: { query }
  });
};
