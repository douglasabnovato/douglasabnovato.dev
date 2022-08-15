import React from "react";

export default props => {
    return (
        <div>
            <button onClick={props.setIncrement}>+</button> 
            <button onClick={props.setDecrement}>-</button>
        </div>
    )
}