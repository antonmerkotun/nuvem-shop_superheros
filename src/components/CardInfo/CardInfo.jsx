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
import axios from "axios";
import {array} from "prop-types";


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


    const [avatarUrl, setAvatarUrl] = useState(avatar)
    const photoSelection = (event) => {
        photosData.data.forEach(photo => {
            if (photo._id === event.target.id) {
                setAvatarUrl(photo.url)
            }
        })
    }

    const editForm = () => {
        setCardState("edit")
        setAvatarUrl(avatar)
    }

    const saveHero = async () => {
        if (cardState === "edit") {
            const objectHero = {
                idOb: hero._id,
                nickName: nickNameInput,
                realName: realNameInput,
                originDescription: originDescriptionInput,
                catchPhrase: catchPhraseInput,
                superpowers: superpowersInput,
                avatar: avatarUrl
            }
            dispatch(patchHeroAction(objectHero))
        }

        dispatch(getHeroesAction())
        // setAvatar('')
        setModal("close")
    }


    const deleteHero = async () => {
        setModal("close")
        await dispatch(deleteHeroAction(hero._id))
        await dispatch(getHeroesAction())
    }


    return (
        <>
            <div className="card_info-image">
                {cardState === 'info' && <Avatar avatar={avatarUrl}/>}
                {cardState === 'edit' && <Avatar avatar={avatarUrl}/>}
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
                    {cardState === "edit" &&
                        images.map(image => {
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
                    {
                        cardState === "create" && <Input value={realNameInput}
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
                    {cardState === "info" &&
                        superpowers.map((superpower, index) => {
                            return <li key={index}>{superpower}</li>
                        })
                    }
                    {cardState === "edit" && <textarea
                        rows="2"
                        className="description-textarea"
                        value={superpowers}
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
                </div>
            </div>
        </>
    );
}

export default CardInfo;