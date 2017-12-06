import React, { Component } from 'react';
import firebase from 'firebase';
import './Estilos.css';

class View_Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reto1:[
            {titulo:''},
            {descripcion:''},
            {tabla:[]},
            {pantalla:0}
        ]};
        this.handleClick=this.handleClick.bind(this);
        this.visto=this.visto.bind(this)
    }
    
    renderar_start(star_Complet, start_total,key){
        var html_start = [];
        for (var i = 1; i <= star_Complet; i++) {
            html_start.push(
                <button type="submit"  className="colum icon" key={i} onClick={this.handleClick.bind(this, key,i)}>
                    <span className="glyphicon glyphicon-star" id="icon-ok" key={i}></span>
                </button>
            );  
        }
    
        for (var i=1; i <= start_total - star_Complet; i++) {
            var f=star_Complet+i;
            html_start.push(
                <button type="button"  className="colum icon" key={f} onClick={this.handleClick.bind(this, key,f)}>
                    <span className="glyphicon glyphicon-star-empty" key={i+start_total}></span>
                </button>
            );  
        } 
        return html_start;
    }    
    
    handleClick(key,Puntuacion) {
        var referenciafirebase=firebase.database().ref().child("Retos_result");
        referenciafirebase.child(key).update({
            puntuacion: Puntuacion,
            qualified:'glyphicon glyphicon-eye-open icon-visto'
        });
    }

    crear_tabla(){       
        var refirebase = firebase.database().ref().child("Retos_result");
        refirebase.on('value', (snapshot) =>{
            var datas = snapshot.val();        
            var filassMostrar =[];
            var most = "reto";
            for (var key in datas) {
                var retos = [];
                for (var i = 1; Object.keys(datas[key].Retos).length >= i; i++) {
                    //items: event.target.items.value
                    var numero = Object.keys(datas[key].Retos[most + i]).length;
                    var pantalla=100/Object.keys(datas[key].Retos).length;
                    this.setState({pantalla:pantalla});
                    var result = [];
                    for (var f = 0; numero > f; f++) {
                        result.push(
                            <tr key={f+'1123'}>
                                <td>
                                <div style={{margin:4+'px'}} key={f+1005}>
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#'+key+f+i}>
                                        <span className="glyphicon glyphicon-eye-open">
                                        </span> &nbsp; {datas[key].Retos[most + i][f]['item']}
                                    </button> 
                                    <div className="modal fade" id={key+f+i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        {datas[key].Retos[most + i][f]['item']}
                                                    </h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <pre>
                                                        <code className="html">{datas[key].Retos[most + i][f]['result']}</code>
                                                    </pre>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </td>
                                </tr>
                        )
                    }
                    retos.push(
                            <div className="table-responsive view_table" style={{width:pantalla+'%'}} key={i+1012}>
                              <table className="table table-bordered">
                              <thead>
                              <tr>
                                <th><b>
                                            Reto{i}
                                        </b>
                                </th>
                                </tr>
                                </thead>
                                <tbody>
                                
                                            {result}
                                        
                                
                                    </tbody>
                        </table>
                        </div>
                    );
                }
                filassMostrar.push(
                    
                        <tr key={key}>
                            <td>
                                {retos}
                            </td>
                            <td style={{paddingTop:25+'px'}}>
                                {this.renderar_start(datas[key].puntuacion,5,key)}
                            </td>
                            <td style={{paddingTop:25+'px'}}>
                                <a href={datas[key].CVURL} target="_blank" className="icon">
                                    <span className="glyphicon glyphicon-download-alt "></span>
                                </a>
                            </td>
                            <td style={{paddingTop:25+'px'}}>
                                <button type="button"  className="icon" onClick={this.visto.bind(this, key)}>
                                    <span className={datas[key].qualified+' icon'}></span>
                                </button>
                            </td>
                        </tr>   
                )
                retos = [];
            }
            this.setState({tabla:filassMostrar});
        });  
    }
    
    visto(key){
        var refirebase = firebase.database().ref().child("Retos_result");
        var visto='';
        var Puntuacio=0;
        refirebase.on('value', (snapshot) =>{
            var datas = snapshot.val();
            visto=((datas[key].qualified=== "glyphicon glyphicon-eye-open icon-visto") ? "glyphicon glyphicon-eye-close" : "glyphicon glyphicon-eye-open icon-visto");
            Puntuacio=((datas[key].qualified=== "glyphicon glyphicon-eye-close") ? 1 : 0 );
        });
        refirebase.child(key).update({
            puntuacion: Puntuacio,
            qualified:visto
         });
    }
    
    componentWillMount(){
      this.crear_tabla();
    }
    
    render() {
        return (
                <div className="container">
  <div className="row">
    <div className="col-xs-12">
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th>Retos</th>
              <th>PUNTUACION</th>
              <th>CV</th>
              <th>Visto</th>
            </tr>
          </thead>
          <tbody>
          {this.state.tabla}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>  
        );
    }
}
export default View_Result;
