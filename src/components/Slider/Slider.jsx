import React from 'react';
import "./Slider.scss"
import Button from "../Button/Button";

function Slider({array}) {
    
    const nextPage = (event) => {

    }
    
    const prevPage = (event) => {
      
    }
    
    return (
        <>
            <div className="slider">
                <div className="slider-container">
                    <div className="slider-line">
                        {array.map(item => {
                            return <div className="slider-block" key={item._id}>
                                {item.nickName}
                            </div>
                        })}
                    </div>
                    <div className="slider-button">
                        <Button text="< Back" onClick={nextPage}/>
                        <Button text="Prev >" onClick={prevPage}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slider;