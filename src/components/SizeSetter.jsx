import React from 'react'
import { useContext } from 'react'
import AppContext from '../helpers/AppCtx'

function SizeSetter() {
    const appCtx = useContext(AppContext);
    const size = appCtx.radioSize

    const setChartSize = (e) => {
        appCtx.changeChartSize(e.target.value)
    }

    return (
        <div className="size-setter">
            <label htmlFor="top-10">Top 10</label>
            <input onChange={setChartSize} type="radio" name="size" id="top-10" value='10' checked={size == 10}/>
            <label htmlFor="top-20">Top 20</label>
            <input onChange={setChartSize} type="radio" name="size" id="top-20" value='20' checked={size == 20}/>
            <label htmlFor="top-50">Top 50</label>
            <input onChange={setChartSize} type="radio" name="size" id="top-50" value='50' checked={size == 50}/>
        </div>
    )
}

export default SizeSetter
