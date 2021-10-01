import React, {useRef, useContext} from 'react'
import AppContext from '../helpers/AppCtx'
import SizeSetter from './SizeSetter'

function ChartForm(props) {
    const appCtx = useContext(AppContext)
    const nameSaveInput = useRef()

    const setSaveName = (e) => {
        const currentInput = nameSaveInput.current.value
        if(e.key === 'Enter' && currentInput.trim() !== ''){
            props.setSaveHandler(currentInput)
        }
    }

    const setNewChart = () => {
        appCtx.setNewChart()
    }

    return (
    <div className="chart-display-info">
        {props.chartName && <h3 className="chart-title">{props.chartName}</h3>}
        <div className="display-right">
        <SizeSetter />
        {!props.chartName ?
            <form className="chart-form">
                <input className="chart-save-input pkmn-input" ref={nameSaveInput} onKeyDown={setSaveName} placeholder='Name your chart to save...' type="text" />
            </form> : <button className="new-chart-btn" onClick={setNewChart}>New Chart</button>}
        </div>
    </div>
    )
}

export default ChartForm
