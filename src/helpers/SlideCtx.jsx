import React, {useState, useEffect, useCallback} from 'react';

const SlideContext = React.createContext()

export const SlideContextProvider = props => {
    const [filterSlide, setFilterSlide] = useState(false)
    const [chartSlide, setChartSlide] = useState(false)

    const openSlideHandler = (name) => {
       const slideName = name.toLowerCase()

       console.log(slideName, 'SLIDE NAME RECEIVED')
       switch(slideName){
           case 'chart':
               setChartSlide(true)
               break
           case 'filter':
               setFilterSlide(true)
               break
       }
    }

    const closeSlideHandler = (name) => {
        const slideName = name.toLowerCase()
 
        switch(slideName){
            case 'chart':
                setChartSlide(false)
                break
            case 'filter':
                setFilterSlide(false)
                break
        }
     }

    return <SlideContext.Provider value = {{
        filterSlide,
        chartSlide,
        openSlideHandler,
        closeSlideHandler
    }}>{props.children}</SlideContext.Provider>
}

export default SlideContext