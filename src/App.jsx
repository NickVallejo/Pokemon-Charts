import React, {useState, useContext} from 'react'
import Search from './components/Search'
import Display from './components/Display'
import { AppContextProvider } from './helpers/AppCtx'
import AppWrap from './components/AppWrap'
import ChartList from './components/ChartList'
import './App.css'

function App() {

    const [results, setResults] = useState()

    const resultsSetContext = (pkmnRes) => {
        let statsArray = []
        let typeArray = []

        pkmnRes.stats.forEach(stat => {
            statsArray.push({statName: stat.stat.name, statBase: stat.base_stat})
        })

        pkmnRes.types.forEach(type => {
            typeArray.push(type.type.name)
        })
    
        setResults({
            name: pkmnRes.name,
            stats: statsArray,
            sprites: {normal: pkmnRes.sprites.front_default, shiny: pkmnRes.sprites.front_shiny},
            id: pkmnRes.id,
            types: typeArray
        })
    }

    return (
        <AppContextProvider>
            <AppWrap>
                <ChartList />
                <Search resultsSetContext={resultsSetContext} results={results}/>
                <Display results={results}/>
            </AppWrap>
        </AppContextProvider>
    )
}

export default App
