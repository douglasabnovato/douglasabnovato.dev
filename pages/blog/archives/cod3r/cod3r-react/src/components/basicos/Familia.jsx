/* eslint-disable import/no-anonymous-default-export */
import React, { cloneElement } from "react";

export default props => {
    return (
        <div>
            {
                props.children.map((child, i) => {
                    return cloneElement(child,{...props, key: i});
                })
            }
        </div>
    )
}