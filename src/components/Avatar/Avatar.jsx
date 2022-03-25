import React from 'react';
import "./Avatar.scss"

function Avatar({avatar}) {
    return (
        <div className="avatar">
            <div className="avatar-image" style={{backgroundImage: `url(${avatar})`}}/>
        </div>
    );
}

export default Avatar;