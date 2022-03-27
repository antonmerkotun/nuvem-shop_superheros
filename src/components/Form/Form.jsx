import React, {useEffect, useState} from 'react';
import "./Form.scss"
import {useDispatch, useSelector} from "react-redux";
import {setHeroAction} from "../../redux/hero/setHero/setHeroAction";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Avatar from "../Avatar/Avatar";

function Form({
                  create,
                  setModal,
                  nickName = '',
                  realName = '',
                  originDescription = '',
                  catchPhrase = '',
                  superpowers = [],
                  avatar = '',
                  images = [],
                  // photoSelection = '',
              }) {

    const dispatch = useDispatch()
    const setHero = useSelector(state => state.setHero)

    const [nickNameInput, setNickNameInput] = useState(nickName)
    const [realNameInput, setRealNameInput] = useState(realName)
    const [originDescriptionInput, setOriginDescriptionInput] = useState(originDescription)
    const [catchPhraseInput, setCatchPhraseInput] = useState(catchPhrase)
    const [superpowerInput, setSuperpowerInput] = useState('')
    const [superpowerBlock, setSuperpowerBlock] = useState([])

    useEffect(() => {
        setSuperpowerBlock(superpowers)
        console.log(images)
    }, []);


    const setData = (e) => {
        const objectHero = {
            nickName: nickNameInput,
            realName: realNameInput,
            originDescription: originDescriptionInput,
            catchPhrase: catchPhraseInput,
            superpowers: superpowerInput,
        }
        e.preventDefault()
        // dispatch(setHeroAction(objectHero))

        console.log(objectHero)
        setNickNameInput(nickName)
        setRealNameInput(realName)
        setOriginDescriptionInput(originDescription)
        setCatchPhraseInput(catchPhrase)
        setSuperpowerInput(superpowers)
    }


    const createNewSuperhero = () => {
        // setNickNameInput(nickName)
        // setRealNameInput(realName)
        // setOriginDescriptionInput(originDescription)
        // setCatchPhraseInput(catchPhrase)
    }

    const savNewDataSuperhero = () => {
        setModal("close")

        console.log("savNewDataSuperhero")
    }

    return (
        <form className="form" onSubmit={setData}>
            <div className="form-body">
                <div className="form-body-block">
                    <label htmlFor="POST-name">NickName</label>
                    <Input value={nickNameInput}
                           setFunc={setNickNameInput}
                    />
                </div>
                <div className="form-body-block">
                    <label htmlFor="POST-name">Real name</label>
                    <Input value={realNameInput}
                           setFunc={setRealNameInput}
                    />
                </div>
                <div className="form-body-block">
                    <label htmlFor="POST-name">Origin description</label>
                    <Input value={originDescriptionInput}
                           setFunc={setOriginDescriptionInput}
                    />
                </div>
                <div className="form-body-block">
                    <label htmlFor="POST-name">Catch phrase</label>
                    <Input value={catchPhraseInput}
                           setFunc={setCatchPhraseInput}
                    />
                </div>
                <div className="form-body-block-image">
                    <div className="form-body-block-avatar">
                        {avatar ?
                            <Avatar avatar={avatar}/> :
                            <div>
                                <input type="file" className="upload" id="photo-upload"/>
                            </div>
                        }
                    </div>
                    <div className="form-body-block">
                        <label htmlFor="POST-name">Superpowers: </label>
                        {superpowerBlock.length >= 1 ?
                            superpowerBlock.map((superpower) => {
                                return <li className="form-superpower" key={superpower}>
                                    {superpower}
                                </li>
                            }) : <Input value={superpowerInput} setFunc={setSuperpowerInput}/>
                        }
                    </div>
                </div>
            </div>
            <div className="form-button">
                {create === true ?
                    <Button onClick={createNewSuperhero}
                            text="Create"
                            background="transparent"
                            width="100px"
                            height="30px" color="white"
                    /> :
                    <Button onClick={savNewDataSuperhero}
                            text="Save"
                            background="transparent"
                            width="100px"
                            height="30px"
                            color="white"
                    />
                }
            </div>
        </form>
    );
}

export default Form;