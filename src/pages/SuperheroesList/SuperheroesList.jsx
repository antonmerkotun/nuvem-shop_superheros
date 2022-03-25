import React from 'react';
import "./SuperheroesList.scss"
import Card from "../../components/Card/Card";

function SuperheroesList({heroesData, avatarData, photosData}) {
    return (
        <>
            {heroesData.loading === false &&
                <div className="superheroes-list">
                    {heroesData.data.map(hero => {
                        return <li className="hero-item" key={hero._id}>
                            <Card nickname={hero.nickname} avatar={avatarData.data.filter(avatar => hero._id === avatar.hero)}/>
                        </li>
                    })}
                </div>
            }
        </>
    );
}

export default SuperheroesList;