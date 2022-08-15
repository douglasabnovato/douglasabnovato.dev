import React from "react";

export default function Aleatorio(props){
    return(
        <>
            <h2>Desafio Número Aleatório</h2>
            <p> <strong>Valor Mínimo:</strong> {props.minimo}</p>
            <p><strong>Valor Máximo: </strong>{props.maximo}</p>
            <p><strong>Valor Escolhido: </strong>{ (Math.random() * (props.maximo - props.minimo) + props.minimo).toFixed(3) } </p>
        </>
    )
}