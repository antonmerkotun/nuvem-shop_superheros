import React, {useState} from 'react';
import "./SuperheroesList.scss"

//components
import Modal from "../../components/Modal/Modal";
import Slider from "../../components/Slider/Slider";
import CardInfo from "../../components/CardInfo/CardInfo";
import Form from "../../components/Form/Form";

function SuperheroesList({heroesData, avatarData, photosData}) {
    const [modal, setModal] = useState("close")
    const [hero, setHero] = useState('')
    const [avatar, setAvatar] = useState('')
    const [modalChildren, setModalChildren] = useState('')

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
        setModalChildren("info")
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

    const editForm = () => {
        setModalChildren("editForm")
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
            {modal === "info" &&
                <Modal
                    id={hero._id}
                    closeModal={closeModal}
                >
                    {modalChildren === "info" &&
                        <CardInfo
                            avatar={avatar.photo}
                            nickName={hero.nickName}
                            catchPhrase={hero.catchPhrase}
                            originDescription={hero.originDescription}
                            realName={hero.realName}
                            superpowers={hero.superpowers}
                            images={photosData.data.filter(photo => photo.hero === hero._id)}
                            photoSelection={photoSelection}
                            editForm={editForm}
                        />
                    }
                    {modalChildren === "editForm" &&
                        <Form
                            create={false}
                            setModal={setModal}
                            avatar={avatar.photo}
                            nickName={hero.nickName}
                            catchPhrase={hero.catchPhrase}
                            originDescription={hero.originDescription}
                            realName={hero.realName}
                            superpowers={hero.superpowers}
                            images={photosData.data.filter(photo => photo.hero === hero._id)}
                        />
                    }
                </Modal>}
        </>
    );
}

export default SuperheroesList;