/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import  If, { Else } from "./If";

export default props => {
    const usuario = props.usuario || {};
    return (
        <div>
            <If test={usuario && usuario.nome}>
                Seja Bem Vindo <strong>{usuario.nome}</strong> !
                <Else> 
                    Seja Bem Vindo <strong>Amigão</strong> ! 
                </Else>
            </If>
            
        </div>
    )
}