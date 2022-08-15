import React, { useState, useRef, useEffect } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'

const merge = function(s1, s2){
    return [...s1].map(function(e, i){
        return `${e}${s2[i] || ""}`
    }).join("")
}

const UseRef = (props) => {

    const [valueA, setValueA] = useState("");
    const [valueB, setValueB] = useState("");
    const count = useRef(0);
    const myInputA = useRef(null);
    const myInputB = useRef(null);

    useEffect(function(){
        count.current++;
        myInputB.current.focus()
    }, [valueA])

    useEffect(function(){
        count.current++;
        myInputA.current.focus()
    }, [valueB])
    
    return (
        <div className="UseRef">
            <PageTitle
                title="Hook UseRef"
                subtitle="Retorna um objeto mutável com a propriedade .current!"
            />
            <SectionTitle title="Exercício #01"/>
            <div className="center">
                <div>
                    <span className="text">Valor: </span>
                    <span className="text">{merge(valueA, valueB)} [</span>
                    <span className="text red">{count.current}</span>
                    <span className="text">]</span>
                </div>
                <input type="text" className="input" 
                    ref={myInputA}
                    value={valueA} onChange={e => setValueA(e.target.value)}/>
            </div>
            <SectionTitle title="Exercício #02"/>
            <div className="center"> 
                <input type="text" className="input" 
                    ref={myInputB}
                    value={valueB} onChange={e => setValueB(e.target.value)}/>
            </div>
        </div>
    )
}

export default UseRef
