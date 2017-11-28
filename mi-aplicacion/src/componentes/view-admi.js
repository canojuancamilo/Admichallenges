import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
class ViewAdmi extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            retos:[
            {titulo:''},
            {descripcion:''},
            {items:''},
            {tabla:[]}
          ]
       
         
        };
        this.tabla=[];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mostrarChallenges = this.mostrarChallenges.bind(this);
      }
     
   

    handleChange(event) {
    event.preventDefault();
    var reto = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        items: document.getElementById("items").value,
       
    };
    this.setState({
      retos: reto,
    });

  }
      
      handleSubmit(event) {
        event.preventDefault();
        var retos = this.state.retos;
        const referenciafirebase = firebase.database().ref().child("Retos_info");
        referenciafirebase.push({
          titulo: event.target.titulo.value,
          descripcion: event.target.descripcion.value,
          items: event.target.items.value
         
           });
           this.setState({
            retos: retos,
          });
      }
    
      mostrarChallenges(){
        var tabla = this.state.tabla;
        const referenciafirebase = firebase.database().ref().child("Retos_info");
        referenciafirebase.on("value", function(snap){
          var datos = snap.val();
         
          });
          this.setState({
            tabla: tabla,
          });
        
      }
      componentWillMount() {
        this.mostrarChallenges();
      }
      render() {
     
        return (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className="col-md-4 control-label">Title</label>  
              <div className="col-md-4">
                <input  value={this.state.titulo} id="titulo" onChange={this.handleChange} type="text" className="form-control input-md" required=""></input>                   
              </div>
            </div> 

            <div>
              <label className="col-md-4 control-label">Descripcion</label>  
              <div className="col-md-4">
                <input  value={this.state.descripcion} id="descripcion" onChange={this.handleChange} type="text" className="form-control input-md" required=""></input>                   
              </div>
            </div>

            <div>
              <label className="col-md-4 control-label">Items</label>  
              <div className="col-md-4">
                <input  value={this.state.items} id="items" onChange={this.handleChange} type="text" className="form-control input-md" required=""></input>                   
              </div>
            </div>     
            <input type="submit" value="Submit" id="btnSave"/>
            <table>
           <thead>
           <tr>
           <th>Title</th>
           <th>Description</th>
           <th>Items</th>
           <th>Options</th>
           </tr> 
           </thead>
            {this.state.tabla}
           </table> 

          </form>
           
           
          

       
       
        );
      }
    }
    export default ViewAdmi;