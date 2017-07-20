import $ from 'jquery';

const tags = {  
   "111":{  
      "id":111,
      "title":"java"
   },
   "112":{  
      "id":112,
      "title":"Javascript"
   },
   "113":{  
      "id":113,
      "title":"Python"
   },
   "114":{  
      "id":114,
      "title":"angularjs"
   },
   "115":{  
      "id":115,
      "title":"Misc"
   }
};

export const getTopics = () => {
  
  return $.ajax({
    method: "GET",
    //url: "api/topics"
    url: "tags.json"

  });

  /*
  return $.ajax({
    method: "GET",
    //url: "api/questions",
    url: "http://35.197.43.248:80/api/v1/question",
    //data: {topicId}
    dataType: 'json',
    cache: true
  });*/
   //var theObject = JSON.stringify({"111":{"id":111,"title":"java"}}); 
  //return $.getJSON('', function (data) {
    //console.log(data);
  //});
  //return getTopics_response('{"111":{"id":111,"title":"Java"},"112":{"id":112,"title":"Javascript"},"113":{"id":113,"title":"Python"},"114":{"id":114,"title":"Database"},"115":{"id":115,"title":"Misc"}}');

};

export const getTopic = (id) => {
  return $.ajax({
    method: "GET",
    url: "tag.json"

    //url: `api/topics/${id}`
  });

  
  /*
  return $.ajax({
    method: "GET",
    //url: "api/questions",
    url: "http://35.197.43.248:80/api/v1/question",
    //data: {topicId}
    dataType: 'json',
    cache: true
  });*/
  //getTopic_response('');

};

export const createTopic = (topic) => {
  return $.ajax({
    method: "POST",
    url: "api/topics",
    data: { topic }
  });
};

function getTopics_response(response) {
  return function (params) {
    params.success(response);
  };
}
