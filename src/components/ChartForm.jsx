import React, {useRef, useContext} from 'react'
import AppContext from '../helpers/AppCtx'

function ChartForm(props) {
    const appCtx = useContext(AppContext)
    const nameSaveInput = useRef()

    const setSaveName = (e) => {
        e.preventDefault()
        const currentInput = nameSaveInput.current.value
        if(currentInput){
            props.setSaveHandler(currentInput)
        }
    }

    const setNewChart = () => {
        appCtx.setNewChart()
    }

    return (
    <div className="chart-display-info">
        <h3 className="chart-title">{props.chartName ? props.chartName : "Name your chart to save!"}</h3>
        {!props.chartName ?
        <form className="chart-form">
            <input ref={nameSaveInput} type="text" />
            <button type="submit" onClick={setSaveName}>Save</button>
        </form> : <button onClick={setNewChart}>New Chart</button>}
    </div>
    )
}

export default ChartForm
