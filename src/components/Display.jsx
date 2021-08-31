import React, {useContext, useState, useEffect} from 'react'
import PkmnBox from './PkmnBox'
import AppContext from '../helpers/AppCtx'
import ChartForm from './ChartForm'

function Display(props) {
    const appCtx = useContext(AppContext)
    const [pkmnSwitch, setPkmnSwitch] = useState(false)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    console.log(appCtx.myChart, JSON.parse(localStorage.getItem('myChartList')))

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
        console.log('pokemon switcher toggled on', id)
        setPkmnSwitch(true)
        setFrom(id)
    }

    return (
        <section className="display-sec">
        <ChartForm setSaveHandler={saveChart} chartName={appCtx.myChart.name}/>
        <div className='box-wrap'>
            {appCtx.myChart.chart.map((el, index) => (<PkmnBox
            results={props.results}
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
