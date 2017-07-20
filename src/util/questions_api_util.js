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
  console.log("deleting question with id:", id);
  return $.ajax({
    method: "DELETE",
    url: `http://35.197.43.248:80/api/v1/question/${id}`
  });
};

export const createQuestion = (question) => {
  const questionTitle = question.title;
  //const questionBody = question.body;
  if(!questionTitle) {
    return $.ajax({
      method: "GET",
      url: "http://35.197.43.248:80/api/v1/question",
      dataType: 'json',
      cache: true
    });
  }
  
  return $.ajax({
    method: "POST",
    url: `http://35.197.43.248:80/api/v1/question`,
    data: JSON.stringify({
      title: questionTitle,
      body: questionTitle,
      tags:["Misc"],
      created_at: new Date().toUTCString(),
      author: "napal"}),
    contentType: 'application/json',
    dataType: 'json'
  });

};

export const updateQuestion = (question) => {
  const questionId = question.id;
  const questionTitle = question.title;
  const questionBody = question.body;

  return $.ajax({
    method: "PUT",
    url: `http://35.197.43.248:80/api/v1/question/${questionId}`,
    data: JSON.stringify({
      title: questionTitle,
      body: questionBody
    }),
    contentType: 'application/json',
    dataType: 'json'
  });
};

export const searchQuestions = (query) => {
  /*
  return $.ajax({
    method: "GET",
    url: `http://35.197.43.248:80/api/v1/question`,
    data: { query }
  });*/
  return $.ajax({
    method: "GET",
    //url: "api/questions",
    url: "http://35.197.43.248:80/api/v1/question",
    //data: {topicId}
    dataType: 'json',
    cache: true
  });
};
