import React, {useState, useEffect} from 'react';
import Chart from '../classes/ChartClass';

const AppContext = React.createContext()

export const AppContextProvider = props => {
    const [pkmnSelected, setPkmnSelected] = useState(false)    
    const [chartSize, setChartSize] = useState(10)
    const [justSaved, setJustSaved] = useState(false)
    const [myChart, setMyChart] = useState(new Chart(false, [null,null,null,null,null,null,null,null,null,null]))
    const [myChartList, setMyChartList] = useState([])

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
        if(myChartList && myChartList.length > 0 && !justSaved){
            setMyChart(myChartList[0])
            console.log('not just saved')
        }
        if(myChartList && myChartList.length > 0 && justSaved){
            console.log('just saved')
            setMyChart(myChartList[myChartList.length-1])
        }

        return
    }, [myChartList])

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

    useEffect(() => {
        localStorage.setItem('myChartList', JSON.stringify(myChartList))
        console.log('retreiving my chart list', myChartList)
    }, [myChart, myChartList])

    const addToChart = (index, pkmn) => {
        //Shifting algorithm
        setMyChart(prevChart => {
            const mutChart = {...prevChart}
            //let popBool = false
            //let toBeMoved = []
            //console.log(`LOOKING AT YOU ${JSON.stringify(mutChart.chart[0])}`)
            // if(mutChart.chart[index] !== null){
            //     for(let i = index; mutChart.chart[i] !== null && i < 10; i++){
            //             toBeMoved.push({el: mutChart.chart[i], index: i})
            //             console.log(`in the loop ${i}`)
            //             popBool = i == 9 ? true : false
            //     }
            //     toBeMoved.forEach(move => {
            //         console.log('THE MOVE', move.index+1)
            //         mutChart.chart[move.index+1] = move.el
            //     })
            // }
            mutChart.chart[index] = pkmn
            //popBool && mutChart.chart.pop()
            return mutChart
        })
    }

    const removePkmn = (index) => {
        setMyChart(prevChart => {
            const mutChart = Object.assign({}, prevChart)
            console.log(mutChart)
            mutChart.chart[index] = null
            return mutChart
        })
    }

    const pkmnClicked = () => {
        pkmnSelected ? setPkmnSelected(false) : setPkmnSelected(true)
    }

    const selectOff = (e) => {
        if(e.target.closest('.search-wrap') !== null 
        || e.target.closest('.pkmn-box')){
            return
        }

        setPkmnSelected(false)
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

    const setNewChart = () => {
        setMyChart(new Chart(false, [null,null,null,null,null,null,null,null,null,null]))
    }

    return <AppContext.Provider value = {{
        pkmnSelected,
        myChart,
        myChartList,
        pkmnClicked,
        selectOff,
        addToChart,
        removePkmn,
        saveChartToList,
        pkmnDisplaySwitch,
        selectListItem,
        setNewChart
    }}>{props.children}</AppContext.Provider>
}

export default AppContext