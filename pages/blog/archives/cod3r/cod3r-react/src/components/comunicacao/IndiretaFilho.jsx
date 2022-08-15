import React from "react"; 

export default props => { 
    const cb = props.quandoClicar
    const min = 50
    const max = 70
    const gerarIdade = () => parseInt(Math.random() * (50 - 20)) + 20
    const gerarNerd = () => Math.random() > 0.5
    return(
        <div> 
            <div> Filho </div>
            <button onClick={_ => cb("João", gerarIdade(), gerarNerd())
            }> Fornecer Informações </button>
        </div>
    )
}