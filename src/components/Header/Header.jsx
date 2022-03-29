import React from 'react';
import "./Header.scss"

//components
import Button from "../Button/Button";

function Header({createNewHero}) {
    return (
        <header className="header">
            <div className="header_buttons">
                    <Button onClick={createNewHero} text={"Create a superhero"} height={"30px"} width={"200px"} color={"#ffffff"}/>
            </div>
        </header>
    );
}

export default Header;