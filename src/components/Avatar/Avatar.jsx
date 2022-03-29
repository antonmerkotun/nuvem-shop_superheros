import React from 'react';
import "./Avatar.scss"

function Avatar({id, avatar}) {
    return (
        <div className="avatar">
            {avatar ? <div id={id}
                           className="avatar-image"
                           style={{backgroundImage: `url(${avatar})`}}/> :
                <div id={id}
                     className="avatar-image"
                     style={{backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png)`}}/>
            }
        </div>
    );
}

export default Avatar;