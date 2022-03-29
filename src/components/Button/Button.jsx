import React from 'react';
import "./Button.scss"

function Button({onClick, text, background = "transparent", color, height = "20px", width = "100px"}) {
    return (
        <button onClick={onClick} className="button"
                style={{background: background, color: color, height: height, width: width}}>
            {text}
        </button>
    );
}

export default Button;