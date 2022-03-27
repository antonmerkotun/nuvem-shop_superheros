import React from 'react';
import "./Modal.scss"

function Modal({id, closeModal, children}) {
    return (
        <div className="modal" onClick={closeModal} key={id}>
            <div className="modal-body">
                {children}
                <div onClick={closeModal}>
                    <button className="modal-button-close">Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;