import React from 'react';
import "./CardInfo.scss"

//components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";


function CardInfo({
                      avatar,
                      images = [],
                      photoSelection,
                      nickName,
                      realName,
                      originDescription,
                      superpowers = [],
                      catchPhrase,
                      editForm
                  }) {
    return (
        <>
            <div className="card_info-image">
                <Avatar avatar={avatar}/>
                <div className="card_info-image-list">
                    {images.map(image => {
                        return <div className="card_info-image-mini" key={image._id} id={image._id}
                                    onClick={photoSelection}>
                            <Avatar avatar={image.photo} id={image._id}/>
                        </div>
                    })}
                </div>
            </div>
            <div className="card_info-info">
                <div className="card_info_nickname card_info-info-block">
                    <span className="modal-info-text">Nickname:</span>
                    <span> {nickName}</span>
                </div>
                <div className="card_info_realName card_info-info-block">
                    <span className="card_info-info-text">Real Name:</span>
                    <span> {realName}</span>
                </div>
                <div className="card_info_origin-description card_info-info-block">
                    <span className="card_info-info-text">Origin Description:</span>
                    <span> {originDescription}</span>
                </div>
                <div className="card_info_superpowers card_info-info-block">
                    <span className="card_info-info-text">Superpowers:</span>
                    {superpowers.map(superpower => {
                        return <li key={superpower}>{superpower}</li>
                    })}
                </div>
                <div className="card_info_catchPhrase card_info-info-block">
                    <span className="card_info-info-text">Catch Phrase:</span>
                    <span> {catchPhrase}</span>
                </div>
                <div className="card_info-button">
                    <Button onClick={editForm} text="Edit" width="150px" height="30px" color="#ffffff"/>
                </div>
            </div>
        </>
    );
}

export default CardInfo;