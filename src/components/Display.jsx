import React, {useContext, useState, useEffect} from 'react'
import PkmnBox from './PkmnBox'
import AppContext from '../helpers/AppCtx'
import ChartForm from './ChartForm'

function Display(props) {
    const appCtx = useContext(AppContext)
    const [pkmnSwitch, setPkmnSwitch] = useState(false)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    console.log('MY CHART BEFORE MAP', appCtx.myChart)

    useEffect(() => {
        if(!isNaN(from) && !isNaN(to)){
            appCtx.pkmnDisplaySwitch(from, to)
        }
        return () => {
            setPkmnSwitch(false)
            setFrom('')
            setTo('')
        }
    }, [to])


    const saveChart = (name) => {
        appCtx.saveChartToList(name)
    }

    const pkmnSwitcherInit = (id) => {
        if(pkmnSwitch){
            setTo(id)
        }
    }

    const pkmnSwitcherToggle = (id) => {
        setPkmnSwitch(true)
        setFrom(id)
    }

    return (
        <section className="display-sec">
        <ChartForm setSaveHandler={saveChart} chartName={appCtx.myChart.name}/>
        <div className='box-wrap'>
            {appCtx.myChart.chart.map((el, index) => (<PkmnBox
            from={from}
            pkmnSwitcherInit={pkmnSwitcherInit} 
            pkmnSwitcherToggle={pkmnSwitcherToggle} 
            pkmnSwitch={pkmnSwitch} 
            key={index} 
            id={index} 
            myPkmn={el}/>))}
        </div>
        </section>
    )
}

export default Display
