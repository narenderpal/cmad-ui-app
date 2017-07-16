import $ from 'jquery';

export const getTopics = () => {
  /*
  return $.ajax({
    method: "GET",
    url: "api/topics"
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

export const getTopic = (id) => {
  /*return $.ajax({
    method: "GET",
    url: `api/topics/${id}`
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

export const createTopic = (topic) => {
  return $.ajax({
    method: "POST",
    url: "api/topics",
    data: { topic }
  });
};
