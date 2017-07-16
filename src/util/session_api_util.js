import $ from 'jquery';

export const signup = (user) => {
  return $.ajax({
    method: "POST",
    url: "http://35.197.43.248/api/v1/user",
    data: JSON.stringify({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }), 
    contentType: 'application/json',
    dataType: 'json'
  });
};

export const login = (user) => {
  
  return $.ajax({
    method: "POST",
    url: "http://35.197.43.248:80/api/v1/user/login",
    data: JSON.stringify({
      username: user.username,
      password: user.password}),
    //data: user,
    contentType: 'application/json',
    dataType: 'json'
    //cache: true,
  }); 
  /*
  return $.ajax({
         //url: "http://jsonplaceholder.typicode.com/posts",
         //url: "http://localhost:8080/question",
         url: "http://35.197.43.248/api/v1/user/napal",
         dataType: 'json',
         cache: true
         //success: function(data) {
           // this.setState({items: data});
         //}.bind(this),
           // error: function(xhr, status, err) {
            //console.error("this.props.url", status, err.toString());
         //}
      });*/
};

export const logout = (username) => {
  /*
  return $.ajax({
    method: "DELETE",
    url: "api/session"
  });*/
  return $.ajax({
         //url: "http://jsonplaceholder.typicode.com/posts",
         //url: "http://localhost:8080/question",
         url: "http://35.197.43.248/api/v1/user/guest",
         dataType: 'json',
         cache: true
         //success: function(data) {
           // this.setState({items: data});
         //}.bind(this),
           // error: function(xhr, status, err) {
            //console.error("this.props.url", status, err.toString());
         //}
      });
};
