import React from 'react';
import "./Card.scss"

function Card({nickname, image}) {
    return (
        <div className="card">
            <div className="card-header">
                <p>{nickname}</p>
                {/*{console.log(image)}*/}
            </div>
            <div className="card-body">
                <div className="card-body_image" style={{backgroundImage: `${image}`}}/>
            </div>
        </div>
    );
}

export default Card;