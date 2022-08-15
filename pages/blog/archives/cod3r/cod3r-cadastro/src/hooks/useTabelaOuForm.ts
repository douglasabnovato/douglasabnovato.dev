import { useState } from "react"

export default function useTabelaOuForm(){

    const [visivel, setVisivel] = useState<"table" | "form">("table")

    const exibirTabela = () => setVisivel("table")
    const exibirFormulario = () => setVisivel("form")

    return{
        formularioVisivel: visivel === "form",
        tabelaVisivel: visivel === "table",
        exibirTabela,
        exibirFormulario
    }

}
