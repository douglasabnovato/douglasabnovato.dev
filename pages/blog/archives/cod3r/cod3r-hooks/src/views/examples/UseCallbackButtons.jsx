import React from 'react'

const UseCallbackButtons = (props) => {
    return (
        <div>  
            <button className="btn" onClick={() => props.inc(6)}>+6</button>
            <button className="btn" onClick={() => props.inc(12)}>+12</button>
            <button className="btn" onClick={() => props.inc(18)}>+18</button>
        </div>
    )
}

export default React.memo(UseCallbackButtons)
