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
        
    
        }


        renderarChulos(chulosCompletados, chulosTotales){
            var htmlChulos = [];
            for (var i = 0; i < chulosCompletados; i++) {
            htmlChulos.push(
                <span className="colum icon" key={i+2000}>
                    <span className="glyphicon glyphicon-star" id="icon-ok" key={i}></span>
                </span>
            ) ;  
            }
    
            for (var i=0; i < chulosTotales - chulosCompletados; i++) {
            htmlChulos.push(
                <span className="colum icon" key={i+chulosTotales+10}>
                    <span className="glyphicon glyphicon-star-empty" key={i+chulosTotales}></span>
                </span>
            ) ;  
            }
            console.log(htmlChulos);
            return htmlChulos;
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
                                var pantalla=95/Object.keys(datas[key].Retos).length;
                                this.setState({pantalla:pantalla});
                                var result = [];
                                for (var f = 0; numero > f; f++) {
                                    result.push(
                                        <tr key={f+1005}>
                                            <td>
                                                <div style={{margin:3+'px'}}>
                                                    <b>
                                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#'+key+f+i}>
                                                        <span className="glyphicon glyphicon-eye-open"></span> &nbsp; {datas[key].Retos[most + i][f]['item']}
                                                        </button>  
                                                    </b>
                                                    <div className="modal fade" id={key+f+i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog" role="document">
                                                            <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">{datas[key].Retos[most + i][f]['item']}</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                            <pre><code className="html">{datas[key].Retos[most + i][f]['result']}</code></pre>
                                                            
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
                                    <table className="view_table" key={120+i}  style={{width:this.state.pantalla+'%'}}>
                                       <thead> 
                                            <tr>
                                                <th>
                                                    <b>
                                                        Reto{i}
                                                    </b>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result}
                                        </tbody>
                                    </table>
                                );
                            }
                            filassMostrar.push(
                                <tbody key={'g'+key}>
                                    <tr key={key}>
                                        <td>
                                            {retos}
                                        </td>
                                        <td>
                                            {this.renderarChulos(datas[key].puntuacion,5)}
                                        </td>
                                        <td>
                                            <a href={datas[key].CVURL} target="_blank">
                                                <span className="glyphicon glyphicon-download-alt icon"></span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>    
                            )
                                retos = [];
                        }
                this.setState({tabla:filassMostrar});
                console.log(filassMostrar);
            });  
        }

  componentWillMount(){
      this.crear_tabla();
      
   
  }
    render() {

        return (
            <div key={1000}>
                <div>
                    <div >
                        <table>
                                <thead>
                                    <tr>
                                        <th style={{width:80+'%'}}>Retos</th>
                                        <th style={{width:15.5+'%'}}>PUNTUACION</th>
                                        <th style={{width:4.5+'%'}}>CV</th>
                                    </tr>     
                                </thead>
                                
                                    {this.state.tabla}
                        </table>           
                    </div>
                </div>
                {}
            </div>            
            
        );
    }
}
export default View_Result;
