import React, {useState} from 'react';
import axios from "axios";
import Button from "../Button/Button";
import "./Upload.scss"

function Upload({
                    cardState,
                    originDescriptionInput,
                    nickNameInput,
                    realNameInput,
                    catchPhraseInput,
                    setModal,
                    superpowersInput,
                }) {
    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState()
    const [files, setFiles] = useState('')
    const [allFiles, setAllFiles] = useState('')

    const handelFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handelSubmitFile = (e) => {
        e.preventDefault()
        if (!previewSource) return;
        uploadImage(previewSource)
    }

    const uploadImage = async (base64EncodedImage) => {
        const superpowersArray = superpowersInput.split(',')
        if (cardState === "create") {
            await axios.post('/create/new-hero', {
                data: base64EncodedImage,
                nickName: nickNameInput,
                realName: realNameInput,
                originDescription: originDescriptionInput,
                catchPhrase: catchPhraseInput,
                image: allFiles,
                superpowers: superpowersArray,
            })
        }
        setModal('close')
    }

    const allFile = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setAllFiles(prev => [...prev, reader.result])
        }
    }

    return (
        <div>
            <form onSubmit={handelSubmitFile}>
                <div>Select avatar</div>
                {<input className="input_change-file" type="file" name="image" onChange={handelFileInputChange}
                        value={fileInputState}/>
                }
                {previewSource && <img src={previewSource} className="change-file" alt="image"
                                       style={{height: "100%", width: "100%"}}/>}
                <div className="additional-photos">Select additional photos</div>
                <div className="more-image">
                    <input className="more-image-input" type="file" value={files} onChange={allFile}/>
                </div>
                <div className="more-image">
                    <input className="more-image-input" type="file" value={files} onChange={allFile}/>
                </div>
                <div className="more-image">
                    <input className="more-image-input" type="file" value={files} onChange={allFile}/>
                </div>
                <div className="more-image">
                    <input className="more-image-input" type="file" value={files} onChange={allFile}/>
                </div>
                <div className='button-save'>
                    <Button text="Save" color="#ffffff" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default Upload;