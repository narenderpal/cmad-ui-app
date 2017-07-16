import React, { Component } from 'react';

class Directory extends Component {
   render() {
      var entries = [{
         name:"Krishna",
         phone:9731423166
      },{
         name:"Mohan",
         phone:8040958066
      }
      ];
      return (
         <table>
            <tr>
               <th>Name</th><th>Phone Number</th>
            </tr>
            <tr>
               <td>{entries[0].name}</td>
               <td>{entries[0].phone}</td>
            </tr>
            <tr>
               <td>{entries[1].name}</td>
               <td>{entries[1].phone}</td>
            </tr>
         </table>
      );
   }
}

export default Directory;