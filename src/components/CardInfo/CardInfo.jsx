import React, {useState} from 'react';
import "./CardInfo.scss"

//components
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setHeroAction} from "../../redux/hero/setHero/setHeroAction";
import {postHeroAction} from "../../redux/hero/postHero/postHeroAction";
import {getHeroesAction} from "../../redux/heroes/getHeroesAction";


function CardInfo({
                      hero,
                      nickName,
                      realName,
                      originDescription,
                      catchPhrase,
                      avatar = '',
                      superpowers = [],
                      images = [],
                      photoSelection,
                      setCard,
                      setModal,
                  }) {

    const [cardState, setCardState] = useState(setCard)
    const [nickNameInput, setNickNameInput] = useState(nickName)
    const [realNameInput, setRealNameInput] = useState(realName)
    const [originDescriptionInput, setOriginDescriptionInput] = useState(originDescription)
    const [catchPhraseInput, setCatchPhraseInput] = useState(catchPhrase)
    const [avatarInput, setAvatarInput] = useState(avatar)
    const [img, setImg] = useState('')


    const dispatch = useDispatch()
    const setHero = useSelector(state => state.setHero)

    const editForm = () => {
        setCardState("edit")
    }
    // console.log(hero)

    const saveHero = () => {
        const objectHero = {
            nickName: nickNameInput,
            realName: realNameInput,
            originDescription: originDescriptionInput,
            catchPhrase: catchPhraseInput,
            superpowers: superpowers
        }
        if (setCard === "create") {
            dispatch(postHeroAction(objectHero))
            dispatch(getHeroesAction())
        }

        setModal("close")
        // dispatch(setHeroAction(objectHero))
        console.log(setCard)
    }


    const deleteHero = () => {
        setModal("close")

        console.log(hero)
    }

    return (
        <>
            <div className="card_info-image">
                {cardState === "info" && <Avatar avatar={avatar}/>}
                {cardState === "edit" &&
                    <>
                        {avatar === '' ?
                            <>
                                <input type="file" onChange={(e) => {
                                    setAvatarInput(e.target.value)
                                }}/>
                            </> :
                            <>
                                <Avatar avatar={avatar}/>
                                <button className="delete-avatar">Delete avatar</button>
                            </>
                        }
                    </>
                }
                {cardState === "create" &&
                    <>
                        <input type="file" onChange={(e) => {
                            setAvatarInput(e.target.value)
                        }}/>
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
                {cardState === "create" &&
                    <>
                        <input type="file" onChange={(e) => {
                            setImg(e.target.value)
                        }}/>
                        <input type="file" onChange={(e) => {
                            setImg(e.target.value)
                        }}/>
                        <input type="file" onChange={(e) => {
                            setImg(e.target.value)
                        }}/>
                        <input type="file" onChange={(e) => {
                            setImg(e.target.value)
                        }}/>
                    </>
                }
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