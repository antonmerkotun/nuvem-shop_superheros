import React from 'react';
import "./Input.scss"

function Input({type = "text", value = '', setFunc}) {
    return (
        <>
            <input id="POST-name"
                   className="input"
                   type={type}
                   value={value}
                   onChange={(e) => {setFunc(e.target.value)}}
            />
        </>
    );
}

export default Input;