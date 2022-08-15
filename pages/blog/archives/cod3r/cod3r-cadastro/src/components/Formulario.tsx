import { useState } from "react";
import Cliente from "../core/Cliente"
import Entrada from "./Entrada";
import Botao from "./Botao";

interface FormularioProps{
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps){
    const id = props.cliente?.id ?? null
    const [nome, setNome] = useState(props.cliente?.nome ?? "")
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)
    return (
        <div>
            { id ? (
                <Entrada 
                    somenteLeitura 
                    texto="Código" 
                    valor={id}
                    className="mb-4"
                />
            ) : false }
            <Entrada    
                valorMudou={setNome} 
                texto="Nome" 
                valor={nome}
                className="mb-4"
            />
            <Entrada 
                valorMudou={setIdade} 
                texto="Idade" 
                tipo="number" 
                valor={idade}
                className="mb-4"
            />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
                >
                    { id ? "Alterar" : "Salvar" }
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
} 