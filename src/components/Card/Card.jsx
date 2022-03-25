import React from 'react';
import "./Card.scss"
import Avatar from "../Avatar/Avatar";

function Card({nickname, avatar}) {
    return (
        <div className="card">
            <div className="card-header">
                <p>{nickname}</p>
            </div>
            <div className="card-body">
                {avatar.length >= 1 &&
                    <div className="card-body_image">
                        <Avatar avatar={avatar[0].photo}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Card;