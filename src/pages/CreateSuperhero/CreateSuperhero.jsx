import React from 'react';
import "./CreateSuperhero.scss"
import Form from "../../components/Form/Form";


function CreateSuperhero() {
    return (
        <div className="create-superhero">
            <h1>Create new superhero</h1>
            <Form/>
        </div>
    );
}

export default CreateSuperhero;