import React from "react";
import DiretaFilho from "./DiretaFilho";

export default props => {
    return (
        <div>
            <DiretaFilho nome="Júnior" idade={18} nerd={false}/>
            <DiretaFilho nome="Gabriel" idade={16} nerd={true}/>
        </div>
    )
}