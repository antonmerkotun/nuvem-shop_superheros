import React from 'react';
import "./Card.scss"

//components
import Avatar from "../Avatar/Avatar";

function Card({id, nickName, avatar}) {
    return (
        <div className="card">
            <div className="card-header">
                {nickName ? <p className="card-header-nick_name" id={id}>{nickName}</p> :
                    <p className="card-header-nick_name" id={id}>no nickname</p>
                }
            </div>
            <div className="card-body">
                {avatar.length >= 1 ?
                    <div className="card-body_image">
                        <Avatar id={id} avatar={avatar[0].photo}/>
                    </div>
                    : <div className="card-body_image">
                        <Avatar id={id}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Card;