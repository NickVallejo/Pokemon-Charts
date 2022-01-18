import React, {useState, useEffect} from 'react';
import Chart from '../classes/ChartClass';

const AppContext = React.createContext()

export const AppContextProvider = props => {  
    const [chartSize, setChartSize] = useState(10)
    const [justSaved, setJustSaved] = useState(false)
    const [myChart, setMyChart] = useState(new Chart(false, Array(10).fill(undefined)))
    const [myChartList, setMyChartList] = useState([])
    const [justUploaded, setJustUploaded] = useState(false)
    const [justUpdated, setJustUpdated] = useState(false)
    const [radioSize, setRadioSize] = useState()

    useEffect(() => {
        //if local storage, set chart list to be what's inside local storage
        const chartStorage = localStorage.getItem('myChartList')
        if(chartStorage !== null && JSON.parse(chartStorage).length > 0){
            console.log('We in the if statement baby!')
            setMyChartList(JSON.parse(chartStorage))
        }
    }, [])

    //once localstorage is added to myChart state, set myChart to be the first in the array
    useEffect(() => {
        if(justUpdated){
            setJustUpdated(false)
            return
        }

        if(justUploaded){
            alert('Uploaded!')
            setJustUploaded(false)
            return
        }

        if(myChartList && myChartList.length > 0 && !justSaved){
            setMyChart(myChartList[0])
            console.log('not just saved')
        }
        if(myChartList && myChartList.length > 0 && justSaved){
            console.log('just saved')
            setMyChart(myChartList[myChartList.length-1])
        }

        return
    }, [myChartList, justSaved])

    //pushes newly saved cahrt to chart list
    //! THIS LOGIC MAKES THE EFFECT ABOVE TRIGGER
    const saveChartToList = (name) => {
        setMyChartList(prevList => {
            const mutList = Array.from(prevList)
            const nameNotTaken = mutList.every(list => list.name !== name)
            if(nameNotTaken){
                mutList.push(new Chart(name, myChart.chart))
                !justSaved && setJustSaved(true)
                return mutList
            } else{
                return prevList
            }
        })
    }

    const uploadChartToList = (chart) => {
        if(!chart.chart.every(el => (el !== null && el.hasOwnProperty('sprites')) || el === null) || !chart.name){
            alert('Invalid JSON Object.')
            return
        }
        const nameNotTaken = myChartList.every(list => list.name !== chart.name)

        if(!nameNotTaken){
            const overWrite = window.confirm('You already have a chart with this name! Overwrite?')
            if(!overWrite) return
        }

        setJustUploaded(true)
        setMyChartList(prevList => {
            const mutList = Array.from(prevList)
            const sameName = mutList.findIndex(list => list.name === chart.name)
            console.log('SAME NAME FOUND?', sameName)
            if(sameName !== -1){
                mutList.splice(sameName, 1, chart)
            } else{
                mutList.push(chart)
            }
            return mutList
        })
        
    }

    useEffect(() => {
        setRadioSize(myChart.chart.length)
        localStorage.setItem('myChartList', JSON.stringify(myChartList))
    }, [myChart, myChartList])

    const removePkmn = (index) => {
        setMyChart(prevChart => {
            const mutChart = Object.assign({}, prevChart)
            console.log(mutChart)
            mutChart.chart[index] = null
            return mutChart
        })
    }

    const pkmnDisplaySwitch = (from, to) => {
        console.log('ID of SELECTED POKEMON DETECTED', from, to)
        setMyChart(prevChart => {
            const mutChart = {...prevChart}
            const fromObj = mutChart.chart[from] == null ? null : {...mutChart.chart[from]}
            const toObj = mutChart.chart[to] == null ? null : {...mutChart.chart[to]}
            console.log(toObj, fromObj)
            mutChart.chart[from] = toObj
            mutChart.chart[to] = fromObj

            return mutChart
        })
    }

    const pkmnDisplayAdd = (index, pkmn) => {
        setMyChart(prevChart => {
            const mutChart = {...prevChart}
            mutChart.chart[index] = pkmn
            return mutChart
        })
    }

    const selectListItem = index => {
        setMyChart({...myChartList[index]})
    }

    const deleteListItem = index => {
        myChart.name === myChartList[index].name && setNewChart()
        setMyChartList(prevList => {
            const mutList = Array.from(prevList)
            mutList.splice(index, 1)
            console.log('NEW MUTATED LIST', mutList)
            return mutList
        })
    }

    const downloadListItem = (index) => {
        const stringSave = JSON.stringify(myChartList[index])
        const chartName = myChartList[index].name
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(stringSave);
        const dlAnchorEl = document.getElementById('downloadEl')
        dlAnchorEl.setAttribute("href", dataStr);
        dlAnchorEl.setAttribute("download", `${chartName}.json`);
        dlAnchorEl.click();

    }

    const setNewChart = () => {
        setMyChart(new Chart(false, Array(10).fill(undefined)))
    }

    const updateChart = (newChart) => {
        console.log('PING PING [PING',myChart.name)
        const index = myChartList.findIndex(chart => chart.name === myChart.name)
        if(index !== -1){
            setJustUpdated(true)
            setMyChartList(prevList => {
                const mutList = Array.from(prevList)
                mutList[index].chart = newChart
                return mutList
            })
        }
    }

    const changeChartSize = (size) => {

        if(myChart.chart.length == size) return

        if(myChart.chart.length < size){
            setMyChart(prevChart => {
                const mutChart = Object.assign({}, prevChart)
                const emptySpaces = Array(size - mutChart.chart.length).fill(undefined)
                mutChart.chart = [...mutChart.chart, ...emptySpaces]
                updateChart(mutChart.chart)
                return mutChart
            })
        } else{
            const reduceSize = window.confirm(`Reducing chart size will result in the loss of pokemon ranked higher than ${size}. Continue?`)
            if(!reduceSize) return
            setMyChart(prevChart => {
                const mutChart = Object.assign({}, prevChart)
                const diff = mutChart.chart.length - size
                console.log(diff, 'DIFFERENCE')
                for(let i = 0; i < diff; i++){mutChart.chart.pop()}
                console.log('MUT CHART ON REDUCTION', mutChart)
                updateChart(mutChart.chart)
                return mutChart
            })
        }
    }

    return <AppContext.Provider value = {{
        myChart,
        myChartList,
        radioSize,
        removePkmn,
        saveChartToList,
        pkmnDisplaySwitch,
        selectListItem,
        setNewChart,
        setMyChart,
        uploadChartToList,
        deleteListItem,
        downloadListItem,
        changeChartSize,
        pkmnDisplayAdd
    }}>{props.children}</AppContext.Provider>
}

export default AppContext