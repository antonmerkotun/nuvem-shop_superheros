import React, {useState} from 'react';

function Upload({text, hero = '', avatar = ''}) {
    const [fileInputState, setFileInputState] = useState('')
    // const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState()

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
        await fetch('/api/upload', {
            method: "POST",
            body: JSON.stringify({
                data: base64EncodedImage,
                hero: hero,
                avatar: avatar,
            }),
            headers: {'Content-Type': 'application/json'},
        })
    }

    return (
        <div>
            <form onSubmit={handelSubmitFile}>
                <span>{text} :</span>
                <input type="file" name="image" onChange={handelFileInputChange} value={fileInputState}/>
                {previewSource && <img src={previewSource} alt="image" style={{height: "100%", width: "100%"}}/>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Upload;