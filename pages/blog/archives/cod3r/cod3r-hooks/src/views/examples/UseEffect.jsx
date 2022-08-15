import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/layout/PageTitle';
import SectionTitle from '../../components/layout/SectionTitle';

function calcFatorial(n){
    if(n < 0) return -1 
    if(n === 0) return 1 
    return calcFatorial(n - 1) * (n)
}

function parOuImpar(numberStatus){
    if(numberStatus % 2 === 0){
        return "Par"
    } else {
        return "Ímpar"
    }
}

const UseEffect = (props) => {
    const [numberFat, setNumberFat] = useState(1);
    const [fatorial, setFatorial] = useState(1);
    const [numberStatus, setNumberStatus] = useState(0);
    const [status, setStatus] = useState("qual");

    useEffect(function(){
        setFatorial(calcFatorial(numberFat)); 
    },[numberFat]) 

    useEffect(function(){
        if(fatorial > 1000000) {
            document.title = "Eita !!!"
        }
    },[fatorial]) 

    useEffect(function(){ 
        setStatus(parOuImpar(numberStatus))
    },[ numberStatus]) 

    return (
        <div className="UseEffect">
            <PageTitle
                title="Hook UseEffect"
                subtitle="Permite executar efeitos colaterais em componentes funcionais!"
            />
            <SectionTitle title="Exercício #01"/>
            <div className="center">
                <div>
                    <span className="text">Fatorial:</span>
                    <span className="text red">{fatorial}</span>
                </div>
                <input type="number" className="input" value={numberFat} onChange={e => setNumberFat(e.target.value)}/>
            </div>

            <SectionTitle title="Exercício #02"/>
            <div className="center">
                <div>
                    <span className="text">Status:</span>
                    <span className="text red">{status}</span>
                </div>
                <input type="number" className="input" value={numberStatus} onChange={e => setNumberStatus(e.target.value)}/>
            </div>
        </div>
    )
}

export default UseEffect
