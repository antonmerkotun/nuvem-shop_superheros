import React, {useState} from 'react';
import axios from "axios";
import "./Upload.scss"

//components
import Button from "../Button/Button";
import {getHeroesAction} from "../../redux/heroes/getHeroesAction";
import {useDispatch} from "react-redux";
import {getPhotosAction} from "../../redux/photos/getPhotosAction";
import Avatar from "../Avatar/Avatar";

function Upload({
                    cardState,
                    originDescriptionInput,
                    nickNameInput,
                    realNameInput,
                    catchPhraseInput,
                    setModal,
                    superpowersInput,
                }) {
    const dispatch = useDispatch()
    const [preloadAvatar, setPreloadAvatar] = useState()
    const [preloadAllImage, setPreloadAllImage] = useState('')
    const [isAvatar, setIsAvatar] = useState(true)

    const handelAvatarInputChange = (e) => {
        setIsAvatar(true)
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = ev => {
            setPreloadAvatar(ev.target.result)
        }
        reader.readAsDataURL(file)
    }
    const handelAllImageInputChange = (e) => {
        const files = Array.from(e.target.files)
        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = ev => {
                setPreloadAllImage(prev => [...prev, ev.target.result])
            }
            reader.readAsDataURL(file)
        })
    }
    const deleteAvatar = () => {
        setPreloadAvatar('')
    }

    const deleteAllImage = () => {
        setPreloadAllImage('')
    }

    const saveHero = async () => {
        let superpowersArray
        if (superpowersInput.length >= 1) {
            superpowersArray = superpowersInput.split(',')
        }
        if (cardState === "create") {
            if (!preloadAvatar) {
                setIsAvatar(false)
                return
            }
            await axios.post('/create/new-hero', {
                avatar: preloadAvatar,
                nickName: nickNameInput,
                realName: realNameInput,
                originDescription: originDescriptionInput,
                catchPhrase: catchPhraseInput,
                image: preloadAllImage,
                superpowers: superpowersArray,
            })
                .then(res => {
                    console.log(res)
                })
        }
        await dispatch(getHeroesAction())
        await dispatch(getPhotosAction())
        setModal('close')
    }

    return (
        <>
            <div>
                <label className='btn-select-avatar' htmlFor="file">Select avatar</label>
                <input id='file' type="file" style={{visibility: "hidden"}} onChange={handelAvatarInputChange}/>
                <div className="preload-avatar">
                    <Avatar avatar={preloadAvatar}/>
                    {preloadAvatar && <div className="preload-avatar-button">
                        <Button text="Delete avatar" onClick={deleteAvatar} color="#ffffff"/>
                    </div>}
                    {!isAvatar && <p className="select-avatar">select avatar</p>}
                </div>
            </div>
            <div>
                <label className='btn-select-avatar' htmlFor="files">Add all images</label>
                <input id='files' multiple={true} type="file" style={{visibility: "hidden"}}
                       onChange={handelAllImageInputChange}/>
                <div className="preload-all-image">
                    {preloadAllImage &&
                        preloadAllImage.map(image => {
                            return <div className="preload-all-image-block" key={image}><Avatar avatar={image}/></div>
                        })
                    }
                    {preloadAllImage && <div className="preload-all-image-button">
                        <Button text="Delete all images" width="150px" onClick={deleteAllImage} color="#ffffff"/>
                    </div>}
                </div>
                <div className='button-save'>
                    <Button text="Save" color="#ffffff" onClick={saveHero} width="100px" height="30px"/>
                </div>
            </div>
        </>
    )
}

export default Upload;