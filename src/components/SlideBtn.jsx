import React from 'react'

function SlideBtn({name, passUpSlide, feName}) {

    const passUpHandler = () => passUpSlide(name)

    return (
        <button className={`${name}-slide-btn`} onClick={passUpHandler}>{feName}</button>
    )
}

export default SlideBtn
