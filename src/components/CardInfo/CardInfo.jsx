import React, {useState} from 'react';
import "./CardInfo.scss"
import {useDispatch} from "react-redux";

//components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {postHeroAction} from "../../redux/hero/postHero/postHeroAction";
import {getHeroesAction} from "../../redux/heroes/getHeroesAction";
import {deleteHeroAction} from "../../redux/hero/deleteHero/deleteHeroAction";
import Upload from "../Upload/Upload";
import {patchHeroAction} from "../../redux/hero/patchHero/patchHeroAction";
import {resetAvatarAction} from "../../redux/avatar/resetAvatar/resetAvatarAction";
import {setAvatarAction} from "../../redux/avatar/setAvatar/setAvatarAction";
import {getAvatarAction} from "../../redux/avatar/getAvatarAction";


function CardInfo({
                      hero,
                      nickName = '',
                      realName = '',
                      originDescription = '',
                      catchPhrase = '',
                      avatar = '',
                      superpowers = [],
                      images = [],
                      photoSelection,
                      setCard,
                      setModal,
                      avatarImage,
                      setAvatar,
                  }) {
    const dispatch = useDispatch()
    const [cardState, setCardState] = useState(setCard)
    const [nickNameInput, setNickNameInput] = useState(nickName)
    const [realNameInput, setRealNameInput] = useState(realName)
    const [originDescriptionInput, setOriginDescriptionInput] = useState(originDescription)
    const [catchPhraseInput, setCatchPhraseInput] = useState(catchPhrase)
    const [submitImage, setSubmitImage] = useState(false)

    const editForm = () => {
        setCardState("edit")
    }

    const saveHero = async () => {
        if (setCard === "create") {
            const objectHero = {
                nickName: nickNameInput,
                realName: realNameInput,
                originDescription: originDescriptionInput,
                catchPhrase: catchPhraseInput,
                superpowers: superpowers,
            }
            dispatch(postHeroAction(objectHero))
        }
        if (cardState === "edit") {
            const objectHero = {
                idOb: hero._id,
                nickName: nickNameInput,
                realName: realNameInput,
                originDescription: originDescriptionInput,
                catchPhrase: catchPhraseInput,
                superpowers: superpowers,
            }
            dispatch(resetAvatarAction(hero._id))
            dispatch(setAvatarAction(avatarImage._id))
            dispatch(patchHeroAction(objectHero))
        }

        dispatch(getHeroesAction())
        dispatch(getAvatarAction())
        setAvatar('')
        setModal("close")
    }


    const deleteHero = () => {
        setModal("close")
        dispatch(deleteHeroAction(hero._id))
        dispatch(getHeroesAction())
    }

    return (
        <>
            <div className="card_info-image">
                <Avatar avatar={avatar}/>
                {cardState === "create" &&
                    <>
                        <Upload text="Avatar" avatar={true} setSubmitImage={setSubmitImage}/>
                    </>
                }
                <div className="card_info-image-list">
                    {cardState === "info" &&
                        images.map(image => {
                            return <div className="card_info-image-mini" key={image._id} id={image._id}
                                        onClick={photoSelection}>
                                <Avatar avatar={image.photo} id={image._id}/>
                            </div>
                        })
                    }
                    {cardState === "edit" &&
                        images.map(image => {
                            return <div className="card_info-image-mini" key={image._id} id={image._id}
                                        onClick={photoSelection}>
                                <Avatar avatar={image.photo} id={image._id}/>
                            </div>
                        })
                    }

                </div>
            </div>
            <div className="card_info-info">
                <div className="card_info_nickname card_info-info-block">
                    <span className="modal-info-text">Nickname:</span>
                    {
                        cardState === "info" ? <span> {nickName}</span> :
                            cardState === "edit" && <Input value={nickNameInput}
                                                           setFunc={setNickNameInput}/>
                    }
                    {
                        cardState === "create" && <Input value={nickNameInput}
                                                         setFunc={setNickNameInput}/>
                    }
                </div>
                <div className="card_info_realName card_info-info-block">
                    <span className="card_info-info-text">Real Name:</span>
                    {
                        cardState === "info" ? <span> {realName}</span> :
                            cardState === "edit" && <Input value={realNameInput}
                                                           setFunc={setRealNameInput}/>
                    }
                    {
                        cardState === "create" && <Input value={realNameInput}
                                                         setFunc={setRealNameInput}/>
                    }
                </div>
                <div className="card_info_origin-description card_info-info-block ">
                    <span className="card_info-info-text">Origin Description:</span>
                    {
                        cardState === "info" ? <span> {originDescription}</span> :
                            cardState === "edit" && <textarea
                                rows="9"
                                className="description-textarea"
                                value={originDescriptionInput}
                                onChange={(e) => {
                                    setOriginDescriptionInput(e.target.value)
                                }}/>
                    }
                    {
                        cardState === "create" && <textarea
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
                    {superpowers.map(superpower => {
                        return <li key={superpower}>{superpower}</li>
                    })}
                </div>
                <div className="card_info_catchPhrase card_info-info-block">
                    <span className="card_info-info-text">Catch Phrase:</span>
                    {
                        cardState === "info" ? <span> {catchPhrase}</span> :
                            cardState === "edit" && <textarea
                                rows="2"
                                className="description-textarea"
                                value={catchPhraseInput}
                                onChange={(e) => {
                                    setCatchPhraseInput(e.target.value)
                                }}/>
                    }
                    {
                        cardState === "create" && <textarea
                            rows="2"
                            className="description-textarea"
                            value={catchPhraseInput}
                            onChange={(e) => {
                                setCatchPhraseInput(e.target.value)
                            }}/>
                    }
                </div>
                <div className="card_info-button">
                    {
                        cardState === "info" &&
                        <Button onClick={editForm}
                                text="Edit"
                                width="150px"
                                height="30px"
                                color="#ffffff"
                        />
                    }
                    {
                        cardState === "edit" &&
                        <div className="button-edit">
                            <Button onClick={deleteHero}
                                    text="Delete hero"
                                    width="150px"
                                    height="30px"
                                    color="#ffffff"
                            />
                            <Button onClick={saveHero}
                                    text="Save"
                                    width="150px"
                                    height="30px"
                                    color="#ffffff"
                            />
                        </div>
                    }
                    {
                        cardState === "create" &&
                        <Button onClick={saveHero}
                                text="Save"
                                width="150px"
                                height="30px"
                                color="#ffffff"
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default CardInfo;