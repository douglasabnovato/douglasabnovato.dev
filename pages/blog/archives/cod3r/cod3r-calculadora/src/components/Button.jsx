/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Button.css";

export default props => 
    <button 
        onClick={e => props.click && props.click(props.label)}
        className={`
            button
            ${props.operation ? "operation" : ""}
            ${props.double ? "double" : ""}
            ${props.triple ? "triple" : ""}

    `}>{props.label}</button>