import React from 'react';
import $ from 'jquery';

class Questions extends React.Component {
   constructor(props) {
      super(props);
      this.state = {items: []};
   }
curl -i -X POST 'http://172.17.42.1:8086/write?db=metrics' --data-binary 'hds.sqkms.testmetric,dc=ecp,org_id=11195bf1-b26e-46a5-82e9-8b0173960ee4,node=ciscoecp_10_30_123_172,group_id=hdsgroup test_field=42,node_field="ciscoecp_10_30_123_172" 1499785608666047600'
HTTP/1.1 400 Bad Request

   componentDidMount(){
      this.QuestionListWithjQuery();
   }

   QuestionListWithjQuery() {
      $.ajax({
         //url: "http://jsonplaceholder.typicode.com/posts",
         //url: "http://localhost:8080/question",
         url: "http://35.197.43.248/api/v1/question",
         dataType: 'json',
         cache: true,
         success: function(data) {
            this.setState({items: data});
         }.bind(this),
            error: function(xhr, status, err) {
            console.error("this.props.url", status, err.toString());
         }
      });
   }

   QuestionListWithFetch() {
      //return fetch('http://jsonplaceholder.typicode.com/posts')
      return fetch('http://35.197.43.248/api/v1/question')
         .then(result=>result.json())
         .then(items=>this.setState({items}));
   }

   QuestionListUsingGetJson() {
      return $.getJSON('http://35.197.43.248:80/api/v1/question').then((data) => {
         this.setState({ items: data.results });
      });
   }

   QuestionListWithXMLHttpRequest() {
      var reactHandler = this;    
      var spRequest = new XMLHttpRequest();    
      //spRequest.open('GET', "http://jsonplaceholder.typicode.com/posts",true); 
      //spRequest.open('GET', "http://35.197.43.248/api/v1/question",true); 
       //spRequest.open('GET', "http://localhost:8080/question",true); 
      spRequest.open('GET', "http://35.197.43.248/api/v1/user/napal",true); 
       spRequest.setRequestHeader("Accept","application/json"); 
       spRequest.send();                       
      spRequest.onreadystatechange = function(){    
                    
         if (spRequest.readyState === 4 && (spRequest.status === 200 || spRequest.status === 0)){             
            var result = JSON.parse(spRequest.responseText);  
            reactHandler.setState({ items: result}); 
         } else if (spRequest.readyState === 4 && spRequest.status !== 200){    
            console.log('Error Occured !');   
         }    
      };               
   }
   
   // render as a list
   /*
   render() {
      return(
         <ul>
            {this.state.items.length ?
               this.state.items.map(item=><li key={item._id}>{item.description}</li>) : <li>Loading...</li>
            }
         </ul>
      )
   }
   */
   
   // render as text span
   render() {
      const questions = this.state.items.map((item, i) => {
         return (
               <div>
                  <h4>{item.title}</h4>
                  <span>{item.description}</span>
               </div>
            )
      });

      return <div id="layout-content" className="layout-content-wrapper">
         <div className="panel-list">{ questions }</div>
      </div> 
   
   }    

}

export default Questions;