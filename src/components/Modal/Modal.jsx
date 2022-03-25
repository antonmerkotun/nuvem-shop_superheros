import React from 'react';
import "./Modal.scss"
import Avatar from "../Avatar/Avatar";


function Modal({avatar, image, nickname, realName, originDescription, superpowers, catchPhrase}) {
    return (
        <div className="modal">
            <div className="modal-image">
                <Avatar avatar={avatar}/>
                <div>{image}</div>
            </div>
            <div className="modal-body">
                <div>{nickname}</div>
                <div>{realName}</div>
                <div>{originDescription}</div>
                <div>{superpowers}</div>
                <div>{catchPhrase}</div>
            </div>
        </div>
    );
}

export default Modal;