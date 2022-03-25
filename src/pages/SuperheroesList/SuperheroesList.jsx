import React, {useState} from 'react';
import "./SuperheroesList.scss"
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";

function SuperheroesList({heroesData, avatarData, photosData}) {
    const [modal, setModal] = useState(false)
    const [hero, setHero] = useState('')
    const [avatar, setAvatar] = useState('')
    const [photos, setPhotos] = useState('')

    const openModal = (event) => {
        setModal(true)
        heroesData.data.forEach(hero => {
            if (hero._id === event.target.id){
                setHero(hero)
            }
        })
        avatarData.data.forEach(avatar => {
            if (avatar.hero === event.target.id) {
                setAvatar(avatar)
            }
        })
    }

    const closeModal = (event) => {
        if (event.target.className === 'modal') {
            setModal(false)
        }
    }

    return (
        <>
            {heroesData.loading === false &&
                <div className="superheroes-list">
                    {heroesData.data.map(hero => {
                        return <li className="hero-item" key={hero._id} onClick={openModal}>
                            <Card id={hero._id} nickName={hero.nickName}
                                  avatar={avatarData.data.filter(avatar => hero._id === avatar.hero)}/>
                        </li>
                    })}
                </div>
            }
            {modal === true &&
                <Modal
                id={hero._id}
                avatar={avatar.photo}
                nickName={hero.nickName}
                catchPhrase={hero.catchPhrase}
                originDescription={hero.originDescription}
                realName={hero.realName}
                superpowers={hero.superpowers}
                closeModal={closeModal}/>}
        </>
    );
}

export default SuperheroesList;