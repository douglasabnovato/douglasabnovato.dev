/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import produtos from "../../data/produtos";
import "./TabelaProduto.css";

export default (props) => {  

    const produtoLI = produtos.map((produto, i) => {
        return(
        <tr key={ produto.id } className={i % 2 === 0 ? "Par" : "Impar"}> 
                <td>{ produto.id }</td>
                <td>{ produto.nome }</td>
                <td>R${ produto.preco }</td>  
            </tr>
        );
    }); 

    return ( 
        <div className="TabelaProdutos"> 
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    { produtoLI }      
                </tbody> 
            </table> 
        </div>
    )
};