import React from 'react';
import "./Header.scss"
import Button from "../Button/Button";
import {Link} from "react-router-dom";

function Header({createNewHero}) {
    return (
        <header className="header">
            <div className="header_buttons">
                {/*<Link to="/">*/}
                {/*    <Button text={"Superheros list"} height={"30px"} width={"200px"} color={"#ffffff"}/>*/}
                {/*</Link>*/}
                {/*<Link to="/create-hero">*/}
                    <Button onClick={createNewHero} text={"Create a superhero"} height={"30px"} width={"200px"} color={"#ffffff"}/>
                {/*</Link>*/}
            </div>
        </header>
    );
}

export default Header;