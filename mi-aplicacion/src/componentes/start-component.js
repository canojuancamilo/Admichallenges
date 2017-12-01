import React, { Component } from 'react';
import firebase from 'firebase';
import './Estilos.css';

class Start extends Component {

    constructor(props){
        super(props)
        this.state = {
            reto1:[
            {titulo:''},
            {descripcion:''},
            {tabla:[]},
            {pantalla:0},
            {puntuacion:''}
        ]};
        this.handleClick=this.handleClick.bind(this);
      //  this.visto=this.visto.bind(this)
    }
    Mostrarcalificados(star_Complet, start_total,key){
        var Calificado = [];
        for (var i = 1; i <= star_Complet; i++) {
            Calificado.push(
                <button type="submit"  className="colum icon" key={i} onClick={this.handleClick.bind(this, key,i)}>
                    <span className="glyphicon glyphicon-star" id="icon-ok" key={i}></span>
                </button>
            );  
        }
    
        for (var i=1; i <= start_total - star_Complet; i++) {
            var f=star_Complet+i;
            Calificado.push(
                <button type="button"  className="colum icon" key={f} onClick={this.handleClick.bind(this, key,f)}>
                    <span className="glyphicon glyphicon-star-empty" key={i+start_total}></span>
                </button>
            );  
        } 
        return Calificado;
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

                        if (datas[key].puntuacion>0){
                            
                            var retos = [];
                            for (var i = 1; Object.keys(datas[key].Retos).length >= i; i++) {
                                //items: event.target.items.value
                                var numero = Object.keys(datas[key].Retos[most + i]).length;
                                var pantalla=95/Object.keys(datas[key].Retos).length;
                                this.setState({pantalla:pantalla});
                                var result = [];
                                for (var f = 0; numero > f; f++) {
                                    result.push(
                                        <tr key={f+10005}>
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
                                    <div className="Table-1 view_table" key={120+i}  style={{width:this.state.pantalla+'%'}}>
                            <div className="Heading-1"> 
                                <div className="Row-1">
                                    <div className="Cell-1">
                                        <b>
                                            Reto{i}
                                        </b>
                                    </div>
                                </div>
                            </div>
                            <div className="Row-1">
                                {result}
                            </div>
                        </div>
                                );
                            }
                            filassMostrar.push(
                                <div className="Row-1" key={key}>
                            <div className="Cell-1">
                                {retos}
                            </div>
                            <div className="Cell-1">
                                {this.Mostrarcalificados(datas[key].puntuacion,5,key)}
                            </div>
                            <div className="Cell-1">
                                <a href={datas[key].CVURL} target="_blank">
                                    <span className="glyphicon glyphicon-download-alt icon"></span>
                                </a>
                            </div>
                           
                        </div>   
                )
                retos = [];
                     }
                   
                    
                    }
              
             this.setState({tabla:filassMostrar});
             console.log(filassMostrar);
         });  
     }

   /*  visto(key){
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
    }*/

     componentWillMount(){
        this.crear_tabla();
        
     
    }

    render() {

        return (
            <div key={1000}>
            <div>
                <div className="Table-1" style={{width:90+'%',marginTop:5+'%',marginBottom:5+'%',marginLeft:5+'%',marginRight:5+'%'}}>
                <div className="Heading-1"> 
                <div className="Cell-1" style={{width:72+'%'}}>
                CHALLENGE</div>
                                <div className="Cell-1" >QUALIFIED</div>
                                <div className="Cell-1" style={{width:4.5+'%'}}>CV</div>
                     
                </div>                                
                            {this.state.tabla}          
                </div>
            </div>
            </div>  
        );
    }
}
export default Start;
