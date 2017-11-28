import React, { Component } from 'react';
import '../componentes/Estilos.css'

class Estrellas extends Component {
    constructor(){
        super();
        this.renderarChulos = this.renderarChulos.bind(this);
        
    }

    renderarChulos(chulosCompletados, chulosTotales){
        var htmlChulos = [];
        for (var i = 0; i < chulosCompletados; i++) {
        htmlChulos.push(
            <span className="colum" key={i+60}>
                <span className="glyphicon glyphicon-ok" id="icon-ok" key={i}></span>
            </span>
        ) ;  
        }

        for (var i=0; i < chulosTotales - chulosCompletados; i++) {
        htmlChulos.push(
            <span className="colum" key={i+chulosTotales+100}>
                <span className="glyphicon glyphicon-ok" key={i+chulosTotales}></span>
            </span>
        ) ;  
        }
        return htmlChulos;
    }

    render() {
        this.chulosCompletados = this.props.chulosCompletados;
        this.numeroDeRetos = this.props.chulosTotales; // Numero total de retos que tiene firebase
        return (
            <div>
                {this.renderarChulos(this.chulosCompletados, this.numeroDeRetos)}
            </div>
        );
    }
}

export default Estrellas;


