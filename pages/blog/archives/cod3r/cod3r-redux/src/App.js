import React from "react"

import Intervalo from "./components/Intervalo";
import Media from "./components/Media";
import Soma from "./components/Soma";
import Sorteio from "./components/Sorteio";

import "./App.css" 
 
function App() {
  
  return (
    <div className="App">
      <h1>Exercício React-Redux (Simples)</h1>
      <div className="linha">
        <Intervalo /> 
      </div> 
      <div className="linha"> 
        <Media />
        <Soma />
        <Sorteio />   
      </div> 
    </div>
  );
}

export default App;
