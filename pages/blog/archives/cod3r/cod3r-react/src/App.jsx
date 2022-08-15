import React from "react";

import "./styles/App.css";

import Card from "./components/layout/Card";
import Primeiro from "./components/basicos/Primeiro";
import ComParametro from "./components/basicos/ComParametro";
import Fragmento from "./components/basicos/Fragmento";
import Aleatorio from "./components/basicos/Aleatorio";
import Familia from "./components/basicos/Familia";
import FamiliaMembro from "./components/basicos/FamiliaMembro";
import ListaAlunos from "./components/repeticao/ListaAlunos";
import TabelaProdutos from "./components/repeticao/TabelaProdutos";
import ParOuImpar from "./components/condicional/ParOuImpar";
import UsuarioInfo from "./components/condicional/UsuarioInfo";
import DiretaPai from "./components/comunicacao/DiretaPai";
import IndiretaPai from "./components/comunicacao/IndiretaPai";
import Input from "./components/formulario/Input";
import Contador from "./components/contador/Contador";
import Mega from "./components/mega/Mega";

export default function App(props){
    return(
        <div className="App">
            <h1>Fundamentos React</h1>

            <div className="Cards">

                <Card titulo="#13 - Megasena" color="#B9006E"> 
                    <Mega />
                </Card>

                <Card titulo="#12 - Contador" color="#424242"> 
                    <Contador numeroInicial={4}/>
                </Card>

                <Card titulo="#11 - Componente Controlado (Input)" color="#E45F56"> 
                    <Input/>
                </Card>

                <Card titulo="#10 - Comunicação Indireta" color="#8BAD39"> 
                    <IndiretaPai/>
                </Card>
 
                <Card titulo="#09 - Comunicação Direta" color="#59323C"> 
                    <DiretaPai/>
                </Card>

                <Card titulo="#08 - Renderização Condicional" color="#982395">
                    <ParOuImpar numero={21}/>
                    <UsuarioInfo usuario={{nome: "Fernando"}} />
                    <UsuarioInfo usuario={{}} />
                </Card>

                <Card titulo="#07 - Desafio Repetição" color="#fed766 ">
                    <TabelaProdutos/>
                </Card>

                <Card titulo="#06 - Repetição" color="#FF4C65">
                    <ListaAlunos/>
                </Card>

                <Card titulo="#05 - Componente com Filhos" color="#00C8F8">
                    <Familia sobrenome="Jobs">
                        <FamiliaMembro nome="Steve " /> 
                        <FamiliaMembro nome="Luiza " />  
                        <FamiliaMembro nome="Elon " /> 
                    </Familia>
                </Card>

                <Card titulo="#04 - Desafio Aleatório" color="#FA6900">
                    <Aleatorio minimo={4}  maximo={13} />
                </Card>

                <Card titulo="#03 - Fragmento" color="#E94C6F">
                    <Fragmento/>
                </Card>

                <Card titulo="#02 - Com Parametro" color="#E8B71A">
                    <ComParametro
                        titulo="Segundo Componente"
                        aluno="Pedro Henrique"
                        nota={9.3}
                    />
                </Card>

                <Card titulo="#01 - Primeiro Componente" color="#588C73">
                    <Primeiro></Primeiro>
                </Card>
            </div> 
        </div>
    )        
}