import React from 'react';
import "./Button.scss"

function Button({text, background = "transparent",color, height = "20px", width= "100px"}) {
    return (
        <button className="button" style={{background: background,color: color , height: height, width: width}}>
            {text}
        </button>
    );
}

export default Button;