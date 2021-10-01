import React, {useContext, useState, useEffect} from 'react'
import PkmnBox from './PkmnBox'
import AppContext from '../helpers/AppCtx'
import ClickContext from '../helpers/ClickCtx'
import ChartForm from './ChartForm'

function Display(props) {
    const appCtx = useContext(AppContext);
    const clickCtx = useContext(ClickContext);
    // const [pkmnSwitch, setPkmnSwitch] = useState(false)
    // const [from, setFrom] = useState('')
    // const [to, setTo] = useState('')

    const {pkmnSwitcherInit, pkmnSwitcherToggle, pkmnSwitchCancel, selectedPkmn, from, to, pkmnSwitch} = clickCtx

    useEffect(() => {
        if(!isNaN(from) && !isNaN(to)){
            appCtx.pkmnDisplaySwitch(from, to)
        }
        return () => {
            pkmnSwitchCancel()
        }
    }, [to])

    useEffect(() => {
        if(selectedPkmn){
            pkmnSwitchCancel()
        }
    }, [selectedPkmn])

    const saveChart = (name) => {
        appCtx.saveChartToList(name)
    }

    return (
    <section className="display-sec">
        <div className="display-sec-wrap">
            <ChartForm setSaveHandler={saveChart} chartName={appCtx.myChart.name}/>
            <div className='box-wrap'>
                {appCtx.myChart.chart.map((el, index) => (<PkmnBox
                from={from}
                pkmnSwitch={pkmnSwitch} 
                key={index} 
                id={index} 
                myPkmn={el}/>))}
            </div>
        </div>
    </section>
    )
}

export default Display
