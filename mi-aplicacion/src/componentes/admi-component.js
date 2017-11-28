import React, { Component } from 'react';
import ViewAdmi from './view-admi';
import firebase from 'firebase';
import 'firebase/database';
class Admi extends Component {
    constructor(props) {
        super(props);
    }

    

render() {
    return (
       <div className="hello">
            <div>
            <ViewAdmi/>
           </div>
          </div>
    
    );
  }
}

export default Admi;