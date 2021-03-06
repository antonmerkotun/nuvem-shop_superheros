import React, {useEffect, useState} from 'react';
import "./CardInfo.scss"
import axios from "axios";
import {useDispatch} from "react-redux";
import {getPhotosAction} from "../../redux/photos/getPhotosAction";
import {patchHeroAction} from "../../redux/hero/patchHero/patchHeroAction";
import {getHeroesAction} from "../../redux/heroes/getHeroesAction";
import {deleteHeroAction} from "../../redux/hero/deleteHero/deleteHeroAction";

//components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Upload from "../Upload/Upload";

function CardInfo({
                      hero,
                      nickName = '',
                      realName = '',
                      originDescription = '',
                      catchPhrase = '',
                      avatar = '',
                      superpowers = [],
                      images = [],
                      setCard,
                      setModal,
                      photosData,
                  }) {
    const dispatch = useDispatch()
    const [cardState, setCardState] = useState(setCard)
    const [nickNameInput, setNickNameInput] = useState(nickName)
    const [realNameInput, setRealNameInput] = useState(realName)
    const [originDescriptionInput, setOriginDescriptionInput] = useState(originDescription)
    const [catchPhraseInput, setCatchPhraseInput] = useState(catchPhrase)
    const [superpowersInput, setSuperpowersInput] = useState(superpowers)
    const [deleteImg, setDeleteImg] = useState()

    useEffect(() => {
        dispatch(getPhotosAction())
    },[])

    const [avatarUrl, setAvatarUrl] = useState(avatar)
    const photoSelection = (event) => {
        photosData.data.forEach(photo => {
            if (photo._id === event.target.id) {
                setAvatarUrl(photo.url)
                setDeleteImg(photo)
            }
        })
    }

    const editForm = () => {
        setCardState("edit")
        setAvatarUrl(avatar)
    }

    const saveHero = async () => {
        if (cardState === "edit") {
            if (typeof superpowersInput === "string") {
                const objectHero = {
                    idOb: hero._id,
                    nickName: nickNameInput,
                    realName: realNameInput,
                    originDescription: originDescriptionInput,
                    catchPhrase: catchPhraseInput,
                    superpowers: superpowersInput.split(','),
                    avatar: avatarUrl
                }
                await dispatch(patchHeroAction(objectHero))
            }
            if (typeof superpowersInput === "object") {
                const objectHero = {
                    idOb: hero._id,
                    nickName: nickNameInput,
                    realName: realNameInput,
                    originDescription: originDescriptionInput,
                    catchPhrase: catchPhraseInput,
                    superpowers: superpowersInput,
                    avatar: avatarUrl
                }
                await dispatch(patchHeroAction(objectHero))
            }
        }

        await dispatch(getHeroesAction())
        await dispatch(getPhotosAction())
        setModal("close")
    }


    const deleteHero = async () => {
        setModal("close")
        await dispatch(deleteHeroAction(hero._id))
        await dispatch(getHeroesAction())
    }

    const deleteImage = async (e) => {
        console.log(deleteImg)
        if (deleteImg) {
            await axios.delete(`delete/image/${deleteImg._id}`)
        }
        setAvatarUrl('')
        await dispatch(getPhotosAction())
    }

    return (
        <>
            <div className="card_info-image">
                {cardState === 'info' && <Avatar avatar={avatarUrl}/>}
                {cardState === 'edit' &&
                    <>
                        <Avatar avatar={avatarUrl}/>
                        <div className="button-delete-image">
                            <Button onClick={deleteImage} text="Delete this image" color="#FF0000FF" width="150px"
                                    height="30px"/>
                        </div>
                    </>
                }
                {cardState === "create" &&
                    <Upload cardState={cardState}
                            submitForm={saveHero}
                            moreImage={false}
                            nickNameInput={nickNameInput}
                            realNameInput={realNameInput}
                            originDescriptionInput={originDescriptionInput}
                            catchPhraseInput={catchPhraseInput}
                            superpowersInput={superpowersInput}
                            setModal={setModal}
                    />
                }
                <div className="card_info-image-list">
                    {cardState === "info" &&
                        images.map(image => {
                            return <div className="card_info-image-mini" key={image._id} id={image._id}
                                        onClick={photoSelection}>
                                <Avatar avatar={image.url} id={image._id}/>
                            </div>
                        })
                    }
                    {cardState === "edit" && images.map(image => {
                            return <div className="card_info-image-mini" key={image._id} id={image._id}
                                        onClick={photoSelection}>
                                <Avatar avatar={image.url} id={image._id}/>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="card_info-info">
                <div className="card_info_nickname card_info-info-block">
                    <span className="card_info-info-text">Nickname:</span>
                    {cardState === "info" ? <span> {nickName}</span> :
                        cardState === "edit" && <Input value={nickNameInput}
                                                       setFunc={setNickNameInput}/>
                    }
                    {cardState === "create" && <Input value={nickNameInput}
                                                      setFunc={setNickNameInput}/>
                    }
                </div>
                <div className="card_info_realName card_info-info-block">
                    <span className="card_info-info-text">Real Name:</span>
                    {cardState === "info" ? <span> {realName}</span> :
                        cardState === "edit" && <Input value={realNameInput}
                                                       setFunc={setRealNameInput}/>
                    }
                    {cardState === "create" && <Input value={realNameInput}
                                                      setFunc={setRealNameInput}/>
                    }
                </div>
                <div className="card_info_origin-description card_info-info-block ">
                    <span className="card_info-info-text">Origin Description: </span>
                    {cardState === "info" ? <span className="description-span">{originDescription}</span> :
                        cardState === "edit" && <textarea
                            rows="9"
                            className="description-textarea"
                            value={originDescriptionInput}
                            onChange={(e) => {
                                setOriginDescriptionInput(e.target.value)
                            }}/>
                    }
                    {cardState === "create" && <textarea
                        rows="9"
                        className="description-textarea"
                        value={originDescriptionInput}
                        onChange={(e) => {
                            setOriginDescriptionInput(e.target.value)
                        }}
                    />
                    }
                </div>
                <div className="card_info_superpowers card_info-info-block">
                    <span className="card_info-info-text">Superpowers:</span>
                    {cardState === "info" && <>
                        {typeof superpowers === "string" &&
                            superpowers.split(',').map((superpower, index) => {
                                return <li key={index}>{superpower}</li>
                            })
                        }
                        {typeof superpowers === "object" &&
                            superpowers.map((superpower, index) => {
                                return <li key={index}>{superpower}</li>
                            })
                        }
                    </>
                    }
                    {cardState === "edit" && <textarea
                        rows="2"
                        className="description-textarea"
                        value={superpowersInput}
                        onChange={(e) => {
                            setSuperpowersInput(e.target.value)
                        }}
                    />
                    }
                    {cardState === "create" && <textarea
                        rows="2"
                        className="description-textarea"
                        value={superpowersInput}
                        onChange={(e) => {
                            setSuperpowersInput(e.target.value)
                        }}
                    />
                    }

                </div>
                <div className="card_info_catchPhrase card_info-info-block">
                    <span className="card_info-info-text">Catch Phrase: </span>
                    {cardState === "info" ? <span className="description-span">{catchPhrase}</span> :
                        cardState === "edit" && <textarea
                            rows="2"
                            className="description-textarea"
                            value={catchPhraseInput}
                            onChange={(e) => {
                                setCatchPhraseInput(e.target.value)
                            }}/>
                    }
                    {cardState === "create" && <textarea
                        rows="2"
                        className="description-textarea"
                        value={catchPhraseInput}
                        onChange={(e) => {
                            setCatchPhraseInput(e.target.value)
                        }}/>
                    }
                </div>
                <div className="card_info-button">
                    {cardState === "info" &&
                        <Button onClick={editForm}
                                text="Edit"
                                width="150px"
                                height="30px"
                                color="#ffffff"
                        />
                    }
                    {cardState === "edit" &&
                        <div className="button-edit">
                            <Button onClick={deleteHero}
                                    text="Delete hero"
                                    width="150px"
                                    height="30px"
                                    color="#FF0000FF"
                            />
                            <Button onClick={saveHero}
                                    text="Save"
                                    width="150px"
                                    height="30px"
                                    color="#ffffff"
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default CardInfo;