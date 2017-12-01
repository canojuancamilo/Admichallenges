import React, { Component } from 'react';
import './App.css';
import './componentes/Estilos.css';
import Start from './componentes/start-component';
import View_Result from './componentes/view-results-component';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      estado:2
    }
    this.change_state=this.change_state.bind(this);
  }

  change_state(esta){
    this.setState({estado:esta});
  }
  
  render() {
    return (
      <div className="App">
        <div>
                  <section id="one"  className="sect-UI halo">
                    <h1 className="title">
                      WELCOME TO ADMIN CHALLENGES
                    </h1>
                  </section>
                  <div align= "center" id="button">
                            <button  type="button" className="btn btn-primary" onClick={this.change_state.bind(this,2)}>VIEW CHALLENGES</button>
                            <button  type="button" className="btn btn-primary" onClick={this.change_state.bind(this,1)}>VIEW RESULTS CHALLENGES</button>
                  </div>
                  
              </div>
        {
          (
            this.state.estado === 2
            ?
            <div style={{marginTop:60+'px'}}>
           <View_Result></View_Result>
            
          </div>
            :
           ''
          )
        }
        {
          (
            this.state.estado === 1
            ?
              <div style={{marginTop:60+'px'}}>
                  <Start></Start>
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
