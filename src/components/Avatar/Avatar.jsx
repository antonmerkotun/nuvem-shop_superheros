import React from 'react';
import "./Avatar.scss"

function Avatar({id, avatar}) {
    return (
        <div className="avatar">
            <div id={id} className="avatar-image" style={{backgroundImage: `url(${avatar})`}}/>
        </div>
    );
}

export default Avatar;