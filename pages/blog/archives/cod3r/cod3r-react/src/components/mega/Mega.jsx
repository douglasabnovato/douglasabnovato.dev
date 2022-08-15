/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import "./Mega.css";

export default props => {

    function gerarNumeroNaoContido(min, max, array){
        const aleatorio = parseInt(Math.random() * (max + 1 - min)) + min
        return array.includes(aleatorio) ? 
            gerarNumeroNaoContido(min, max, array) : 
            aleatorio
    } 

    function gerarNumeros(quantidade){
        const numeros = Array(quantidade)
            .fill(0)
            .reduce((nums) => {
                const novoNumero = gerarNumeroNaoContido(1, 60, nums)
                return [ ...nums, novoNumero ]
            }, [])
            .sort((n1, n2) => n1 - n2)
        return numeros
    }
 
    const [quantidade, setQuantidade] = useState(props.quantidade || 6) 
    const numerosIniciais = Array(quantidade).fill(0)
    const [numeros, setNumeros] = useState(numerosIniciais)

    return (
        <div className="Mega">
             <h3>Mega</h3>
             <h4>{numeros.join(" ")}</h4>
             <div>
                 <label>Quantidade de Números</label>
                 <input type="number" value={quantidade}
                    onChange={e => {
                        setQuantidade(+e.target.value)
                        gerarNumeros(+e.target.value)
                    }}
                    min="6"
                    max="15"/>
             </div>
             <button onClick={_ => setNumeros(gerarNumeros(quantidade))}>Gerar Números</button>
        </div>
    ) 

}

