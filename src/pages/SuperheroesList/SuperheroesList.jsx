import React, {useEffect, useState} from 'react';
import "./SuperheroesList.scss"

//components
import Modal from "../../components/Modal/Modal";
import Slider from "../../components/Slider/Slider";
import CardInfo from "../../components/CardInfo/CardInfo";
import Header from "../../components/Header/Header";

function SuperheroesList({heroesData, photosData}) {
    const [modal, setModal] = useState("close")
    const [hero, setHero] = useState('')
    // const [superPowers, setSuperPowers] = useState('')

    // useEffect(() => {
    //     if (typeof hero.superpowers === "string"){
    //         setSuperPowers(hero.superpowers.split(','))
    //     }else {
    //         setSuperPowers(hero.superpowers)
    //     }
    //
    // },[hero])

    const openModal = (event) => {
        heroesData.data.forEach(hero => {
            if (hero._id === event.target.id) {
                setHero(hero)
            }
        })
        setModal("info")
    }

    const closeModal = (event) => {
        if (event.target.className === "modal" || event.target.className === "modal-button-close") {
            setModal("close")
        }
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
                        photosData={photosData}
                        hero={hero}
                        avatar={hero.avatar}
                        nickName={hero.nickName}
                        catchPhrase={hero.catchPhrase}
                        originDescription={hero.originDescription}
                        realName={hero.realName}
                        superpowers={hero.superpowers}
                        images={photosData.data.filter(photo => photo.hero === hero._id)}
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