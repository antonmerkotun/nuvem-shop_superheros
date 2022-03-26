import React, {useState} from 'react';
import "./SuperheroesList.scss"

//components
import Modal from "../../components/Modal/Modal";
import Slider from "../../components/Slider/Slider";

function SuperheroesList({heroesData, avatarData, photosData}) {
    const [modal, setModal] = useState(false)
    const [hero, setHero] = useState('')
    const [avatar, setAvatar] = useState('')

    const openModal = (event) => {
        heroesData.data.forEach(hero => {
            if (hero._id === event.target.id) {
                setHero(hero)
            }
        })
        avatarData.data.forEach(avatar => {
            if (avatar.hero === event.target.id) {
                setAvatar(avatar)
            }
        })
        setModal(true)
    }

    const closeModal = (event) => {
        if (event.target.className === "modal" || event.target.className === "modal-button-close") {
            setModal(false)
        }
    }

    const photoSelection = (event) => {
        photosData.data.forEach(photo => {
            if (photo._id === event.target.id) {
                setAvatar(photo)
            }
        })
    }

    return (
        <>
            <>
                <div className="superheroes-list">
                    <Slider
                        arrayData={heroesData}
                        imageData={avatarData}
                        itemInPage={5}
                        buttonTextNext="Next >"
                        buttonTextPrev="< Prev"
                        openModal={openModal}
                    />
                </div>
            </>
            {modal === true &&
                <Modal
                    id={hero._id}
                    avatar={avatar.photo}
                    nickName={hero.nickName}
                    catchPhrase={hero.catchPhrase}
                    originDescription={hero.originDescription}
                    realName={hero.realName}
                    superpowers={hero.superpowers}
                    images={photosData.data.filter(photo => photo.hero === hero._id)}
                    closeModal={closeModal}
                    photoSelection={photoSelection}
                />}
        </>
    );
}

export default SuperheroesList;