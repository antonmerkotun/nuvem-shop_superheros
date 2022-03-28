import React, {useState} from 'react';
import "./SuperheroesList.scss"

//components
import Modal from "../../components/Modal/Modal";
import Slider from "../../components/Slider/Slider";
import CardInfo from "../../components/CardInfo/CardInfo";
import Header from "../../components/Header/Header";

function SuperheroesList({heroesData, avatarData, photosData}) {
    const [modal, setModal] = useState("close")
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
        setModal("info")
    }

    const closeModal = (event) => {
        if (event.target.className === "modal" || event.target.className === "modal-button-close") {
            setModal("close")
        }
    }

    const photoSelection = (event) => {
        photosData.data.forEach(photo => {
            if (photo._id === event.target.id) {
                setAvatar(photo)
            }
        })
    }

    const createNewHero = () => {
        setModal("create")
    }

    return (
        <>
            <>
                <Header createNewHero={createNewHero}/>
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
            {modal === "info" &&
                <Modal
                    id={hero._id}
                    closeModal={closeModal}
                >
                    <CardInfo
                        hero={hero}
                        avatar={avatar.photo}
                        nickName={hero.nickName}
                        catchPhrase={hero.catchPhrase}
                        originDescription={hero.originDescription}
                        realName={hero.realName}
                        superpowers={hero.superpowers}
                        images={photosData.data.filter(photo => photo.hero === hero._id)}
                        photoSelection={photoSelection}
                        setCard="info"
                        setModal={setModal}
                    />
                </Modal>}
            {modal === "create" &&
                <Modal
                    id={hero._id}
                    closeModal={closeModal}
                >
                    <CardInfo
                        setCard="create"
                        setModal={setModal}
                    />
                </Modal>
            }
        </>
    );
}

export default SuperheroesList;