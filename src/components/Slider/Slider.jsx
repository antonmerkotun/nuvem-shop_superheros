import React, {useEffect, useState} from 'react';
import "./Slider.scss"
import Button from "../Button/Button";
import Card from "../Card/Card";

function Slider({arrayData, itemInPage, buttonTextPrev, buttonTextNext, imageData, openModal}) {
    const [data, setData] = useState([])
    const [initialValue, setInitialValue] = useState(0)


    useEffect(() => {
        if (arrayData.data.length >= 1) {
            let subarray = []
            for (let i = 0; i < Math.ceil(arrayData.data.length / itemInPage); i++) {
                subarray[i] = arrayData.data.slice((i * itemInPage), (i * itemInPage) + itemInPage);
            }
            setData(subarray)
        }
    }, [arrayData])

    const nextPage = () => {
        let num = initialValue
        num = num - 1
        setInitialValue(num)
        if (num <= data.length) {
            setInitialValue(0)
        }
    }

    const prevPage = () => {
        let num = initialValue
        num = num + 1
        setInitialValue(num)
        if (num >= data.length) {
            setInitialValue(data.length - 1)
        }
    }

    return (
        <>
            {data.length >= 1 &&
                <div className="slider">
                    <div className="slider-container">
                        <div className="slider-line">
                            {data[initialValue].map(item => {
                                return <div className="slider-block" key={item._id} id={item._id} onClick={openModal}>
                                    <Card
                                    id={item._id}
                                    nickName={item.nickName}
                                    avatar={imageData.data.filter(avatar => item._id === avatar.hero)}
                                    />
                                </div>
                            })}
                        </div>
                        <div className="slider-button">
                            <Button text={buttonTextPrev} onClick={nextPage}/>
                            <span>{initialValue+1} / {data.length}</span>
                            <Button text={buttonTextNext} onClick={prevPage}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Slider;