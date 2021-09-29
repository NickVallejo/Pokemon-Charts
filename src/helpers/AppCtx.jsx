import React, {useState, useEffect, useCallback} from 'react';
import Chart from '../classes/ChartClass';

const AppContext = React.createContext()

export const AppContextProvider = props => {  
    const [chartSize, setChartSize] = useState(10)
    const [justSaved, setJustSaved] = useState(false)
    const [myChart, setMyChart] = useState(new Chart(false, [null,null,null,null,null,null,null,null,null,null]))
    const [myChartList, setMyChartList] = useState([])
    const [justUploaded, setJustUploaded] = useState(false)

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
        localStorage.setItem('myChartList', JSON.stringify(myChartList))
        console.log('retreiving my chart list', myChartList)
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
        setMyChart(new Chart(false, [null,null,null,null,null,null,null,null,null,null]))
    }

    return <AppContext.Provider value = {{
        myChart,
        myChartList,
        removePkmn,
        saveChartToList,
        pkmnDisplaySwitch,
        selectListItem,
        setNewChart,
        setMyChart,
        uploadChartToList,
        deleteListItem,
        downloadListItem
    }}>{props.children}</AppContext.Provider>
}

export default AppContext