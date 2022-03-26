import React, {useEffect, useState} from 'react';
import "./SuperheroesList.scss"
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";

function SuperheroesList({heroesData, avatarData, photosData}) {
    const [modal, setModal] = useState(false)
    const [hero, setHero] = useState('')
    const [avatar, setAvatar] = useState('')
    const [heroes, setHeroes] = useState([])
    const [heroesNum, setHeroesNum] = useState(0)


    useEffect(() => {
        if (heroesData.data.length >= 1) {
            let size = 5;
            let subarray = []
            for (let i = 0; i < Math.ceil(heroesData.data.length / size); i++) {
                subarray[i] = heroesData.data.slice((i * size), (i * size) + size);
            }
            setHeroes(subarray)
        }
    }, [heroesData]);


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

    const nextPage = (event) => {
        let num = heroesNum
        num = num + 1
        setHeroesNum(num)
        if (num >= heroes.length) {
            setHeroesNum(heroes.length -1)
        }
    }

    const prevPage = (event) => {
        let num = heroesNum
        num = num - 1
        setHeroesNum(num)
        if (num <= heroes.length) {
            setHeroesNum(0)
        }
    }

    return (
        <>
            {heroes.length >= 1 &&
                <>
                    <div className="superheroes-list">
                        {/*{heroesData.data.map(hero => {*/}
                        {/*    return <li className="hero-item" key={hero._id} onClick={openModal}>*/}
                        {/*        <Card id={hero._id}*/}
                        {/*              nickName={hero.nickName}*/}
                        {/*              avatar={avatarData.data.filter(avatar => hero._id === avatar.hero)}*/}
                        {/*        />*/}
                        {/*    </li>*/}
                        {/*})}*/}

                        {heroes[heroesNum].map(hero => {
                            return <li className="hero-item" key={hero._id} onClick={openModal}>
                                <Card id={hero._id}
                                      nickName={hero.nickName}
                                      avatar={avatarData.data.filter(avatar => hero._id === avatar.hero)}
                                />
                            </li>
                        })}
                    </div>
                    <div className="superheroes-list_button-page">
                        <Button text="< Prev" onClick={prevPage}/>
                        <Button text="Next >" onClick={nextPage}/>
                    </div>
                </>

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
                    images={photosData.data.filter(photo => photo.hero === hero._id)}
                    closeModal={closeModal}
                    photoSelection={photoSelection}
                />}
        </>
    );
}

export default SuperheroesList;