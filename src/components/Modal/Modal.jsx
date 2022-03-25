import React from 'react';
import "./Modal.scss"
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";


function Modal({id, closeModal, avatar, images, nickName, realName, originDescription, superpowers, catchPhrase}) {
    return (
        <div className="modal" onClick={closeModal} key={id}>
            <div className="modal-body">
                <div className="modal-image">
                    <Avatar avatar={avatar}/>
                    <div className="modal-image-list">
                        {images.map(image => {
                            console.log(image)
                           return <div className="modal-image-mini" key={image._id}>
                               <Avatar avatar={image.photo}/>
                           </div>
                        })}
                    </div>
                </div>
                <div className="modal-info">
                    <div className="modal_nickname modal-info-block">
                        <span className="modal-info-text">Nickname:</span>
                        <span> {nickName}</span>
                    </div>
                    <div className="modal_realName modal-info-block">
                        <span className="modal-info-text">Real Name:</span>
                        <span> {realName}</span>
                    </div>
                    <div className="modal_origin-description modal-info-block">
                        <span className="modal-info-text">Origin Description:</span>
                        <span> {originDescription}</span>
                    </div>
                    <div className="modal_superpowers modal-info-block">
                        <span className="modal-info-text">Superpowers:</span>
                        {superpowers.map(superpower => {
                            return <li key={superpower}>{superpower}</li>
                        })}</div>
                    <div className="modal_catchPhrase modal-info-block">
                        <span className="modal-info-text">Catch Phrase:</span>
                        <span> {catchPhrase}</span>
                    </div>
                    <div className="modal-button">
                        <Button text="Edit" width="150px" height="30px"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;