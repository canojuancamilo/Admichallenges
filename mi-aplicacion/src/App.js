import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './componentes/Estilos.css';
import Start from './componentes/start-component';
import View_Result from './componentes/view-results-component';
import  Admi from './componentes/admi-component';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      estado:2
    }
  }
  render() {
    return (
      
      <div className="App">
        {
          (
            this.state.estado === 0
            ?
              <div>
                  <section id="one"  className="sect-UI halo">
                    <h1 className="title">
                      WELCOME TO ADMIN CHALLENGES
                    </h1>
                  </section>
                  <div align= "center" id="button">
                            <button  type="button" class="btn btn-primary">VIEW CHALLENGES</button>
                            <button  type="button" class="btn btn-primary">VIEW RESULTS CHALLENGES</button>
                  </div>
                
              
                  <Start/>
              </div>
            :
           ''
         
          )
        }
        {
          (
            this.state.estado === 1
            ?
              <div style={{marginTop:90+'px'}}>
            <View_Result/>
             
              </div>
            :
              ''
          )
        }
        {
          (
            this.state.estado === 2
            ?
              <div style={{marginTop:60+'px'}}>
              <Admi/>
             
              </div>
            :
              ''
          )
        }
      
      </div>
    );
  }
}

export default App;
