import React from 'react';
import "./CreateSuperhero.scss"
import Form from "../../components/Form/Form";


function CreateSuperhero() {
    return (
        <div className="create-superhero">
            <h1 className="create-superhero-title">Create new superhero</h1>
            <Form create={true}/>
        </div>
    );
}

export default CreateSuperhero;