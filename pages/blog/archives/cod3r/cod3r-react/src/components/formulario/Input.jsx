import React, { useState } from "react";
import "./Input.css";

export default props => {

    const [valor, setValor] = useState("");

    function quandoMudar(e){
        setValor(e.target.value);
    }
    return(
        <div className="Input">
            <h3>{valor}</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="text" value={valor} onChange={quandoMudar} placeholder="Componente Controlado"/>
                <input type="text" value={valor} readOnly placeholder="Somente Leitura"/>
                <input type="text" value={undefined} placeholder="Componente Não-Controlado"/>
            </div>
        </div>
    )
}