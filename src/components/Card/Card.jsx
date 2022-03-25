import React from 'react';
import "./Card.scss"
import Avatar from "../Avatar/Avatar";

function Card({id, nickName, avatar}) {
    return (
        <div className="card">
            <div className="card-header">
                <p>{nickName}</p>
            </div>
            <div className="card-body">
                {avatar.length >= 1 &&
                    <div className="card-body_image">
                        <Avatar id={id} avatar={avatar[0].photo}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Card;