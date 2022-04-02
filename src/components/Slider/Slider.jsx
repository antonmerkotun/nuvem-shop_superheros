import React, {useEffect, useState} from 'react';
import "./Slider.scss"

//components
import Button from "../Button/Button";
import Card from "../Card/Card";

function Slider({arrayData, itemInPage, buttonTextPrev, buttonTextNext, openModal}) {
    const [data, setData] = useState([])
    const [numberPage, setNumberPage] = useState(null)

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
        setNumberPage(numberPage + 1)
        if (numberPage >= data.length - 1) {
            setNumberPage(numberPage)
        }
    }

    const prevPage = () => {
        setNumberPage(numberPage - 1)
        if (numberPage <= 0) {
            setNumberPage(numberPage)
        }
    }

    return (
        <>
            {data.length >= 1 &&
                <div className="slider">
                    <div className="slider-container">
                        <div className="slider-line">
                            {data[+numberPage].map(item => {
                                return <div className="slider-block" key={item._id} id={item._id} onClick={openModal}>
                                    <Card
                                        id={item._id}
                                        nickName={item.nickName}
                                        avatar={item.avatar}
                                        // avatar={imageData.data.filter(avatar => item._id === avatar.hero)}
                                    />
                                </div>
                            })}
                        </div>
                        <div className="slider-button">
                            <Button text={buttonTextPrev} onClick={prevPage}/>
                            <span>{numberPage + 1} / {data.length}</span>
                            <Button text={buttonTextNext} onClick={nextPage}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Slider;