import React from 'react';
import "./SuperheroesList.scss"
import Card from "../../components/Card/Card";

function SuperheroesList({heroesData}) {
    return (
        <>
            {heroesData.loading === false &&
                <div className="superheroes-list">
                    {heroesData.data.map(hero => {
                        console.log(hero)
                        return <li className="hero-item" key={hero._id}>
                            <Card nickname={hero.nickname} image={hero.image}/>
                        </li>
                    })}
                </div>
            }
        </>
    );
}

export default SuperheroesList;