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
    // const [fileInputState, setFileInputState] = useState('')
    // const [previewSource, setPreviewSource] = useState()
    // const [files, setFiles] = useState('')
    // const [allFiles, setAllFiles] = useState('')
    //
    // const handelFileInputChange = (e) => {
    //     const file = e.target.files[0]
    //     previewFile(file)
    // }
    //
    // const previewFile = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)
    //     }
    // }
    //
    // const handelSubmitFile = (e) => {
    //     e.preventDefault()
    //     if (!previewSource) return;
    //     uploadImage(previewSource)
    // }
    //
    // const uploadImage = async (base64EncodedImage) => {
    //     let superpowersArray
    //     if (superpowersInput.length >= 1) {
    //         superpowersArray = superpowersInput.split(',')
    //     }
    // if (cardState === "create") {
    //     await axios.post('/create/new-hero', {
    //         data: base64EncodedImage,
    //         nickName: nickNameInput,
    //         realName: realNameInput,
    //         originDescription: originDescriptionInput,
    //         catchPhrase: catchPhraseInput,
    //         image: allFiles,
    //         superpowers: superpowersArray,
    //     })
    // }
    // await dispatch(getHeroesAction())
    // await dispatch(getPhotosAction())
    // setModal('close')
    // }
    //
    // const allFile = (e) => {
    //     const file = e.target.files[0]
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setAllFiles(prev => [...prev, reader.result])
    //     }
    // }
    const [preloadAvatar, setPreloadAvatar] = useState('')
    const [preloadAllImage, setPreloadAllImage] = useState('')

    const handelAvatarInputChange = (e) => {
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
            await axios.post('/create/new-hero', {
                avatar: preloadAvatar,
                nickName: nickNameInput,
                realName: realNameInput,
                originDescription: originDescriptionInput,
                catchPhrase: catchPhraseInput,
                image: preloadAllImage,
                superpowers: superpowersArray,
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
        // <div>
        //     <form onSubmit={handelSubmitFile}>
        //         <div>Select avatar</div>
        //         {<input className="input_change-file" type="file" name="image" onChange={handelFileInputChange}
        //                 value={fileInputState}/>
        //         }
        //         {previewSource && <img src={previewSource} className="change-file" alt="image"
        //                                style={{height: "100%", width: "100%"}}/>}
        //         <div className="additional-photos">Select additional photos</div>
        //         <div className="more-image">
        //             <input className="more-image-input" type="file" value={files} onChange={allFile}/>
        //         </div>
        //         <div className="more-image">
        //             <input className="more-image-input" type="file" value={files} onChange={allFile}/>
        //         </div>
        //         <div className="more-image">
        //             <input className="more-image-input" type="file" value={files} onChange={allFile}/>
        //         </div>
        //         <div className="more-image">
        //             <input className="more-image-input" type="file" value={files} onChange={allFile}/>
        //         </div>
        //         <div className='button-save'>
        //             <Button text="Save" color="#ffffff" type="submit">Submit</Button>
        //         </div>
        //     </form>
        // </div>
    )
}

export default Upload;