import React, { Component } from 'react';


class Title extends Component {
   render() {
   	  var style = {
   	  	color: "#0BB"
   	  }

   	  var title = "All Questions";

      return (
         <div>
            <h1 style={style}>{title}</h1>
            <hr/>
         </div>
      );
   }
}

export default Title;