import React, {useContext} from 'react'
import SlideContext from '../helpers/SlideCtx'
import SlideBtn from './SlideBtn'

function SlideBtns() {

    const slideCtx = useContext(SlideContext);
    const passUpSlide = (name) => slideCtx.openSlideHandler(name);
    

    return (
        <div className="slide-btn-wrap">
            <SlideBtn name={'Filter'} feName={'Filter'} passUpSlide={passUpSlide}/>
            <SlideBtn name={'Chart'} feName={'Charts'} passUpSlide={passUpSlide}/>
        </div>
    )
}

export default SlideBtns
