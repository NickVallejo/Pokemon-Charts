import React, { useState, useContext, useEffect, useMemo, useCallback} from 'react'
import Search from './components/Search'
import Display from './components/Display'
import { AppContextProvider } from './helpers/AppCtx'
import AppWrap from './components/AppWrap'
import ChartList from './components/ChartList'
import axios from 'axios'
import PkmnRes from './components/PkmnRes'
import { pokeRegions, pokeTypes } from './helpers/pokeRegions'
import './App.css'
import FilterSidebar from './components/FilterSidebar'
import AppContext from './helpers/AppCtx'
import pokemon from "./assets/pokemon.json";

function App() {
    let allPokemon;
    const [filter, setFilter] = useState({regions: ['kanto'], types: []})
    const [results, setResults] = useState([])
    const [didLoad, setDidLoad] = useState(false)

    const resultData = useCallback(() => {
        let pkmnRes = []
        setDidLoad(false)

        if(filter.regions.length > 0){
            for(const region of filter.regions){
                const filtRegion = pokeRegions[region]
                console.log('FILTER REGION', filtRegion)
                for(let i = filtRegion.offset; i < filtRegion.offset + filtRegion.limit; i++){
                    if(filter.types.length){
                        const found = pokemon[i].types.some(type => filter.types.includes(type)) 
                        found && pkmnRes.push(pokemon[i])
                        continue
                    }
                    pkmnRes.push(pokemon[i])
                }
            }
        }

        console.log('TADAA!! Filtered pokemon data', pkmnRes)
        
        setResults(pkmnRes)
        setDidLoad(true)
    }, [filter])

    useEffect(() => {
        resultData()
    }, [filter])

    const filterChange = (newFilter) => {
        console.log('we got here', newFilter)
        setFilter(newFilter)
    }

    return (
        <AppContextProvider>
            <FilterSidebar filter={filter} filterChange={filterChange}/>
            {!didLoad ? 
            <p>Loading...</p> : 
            <AppWrap>
                <div className="res-and-list">
                    <ChartList />
                    <div className="search-display">
                        {results.length <= 0 && <p>Select a region.</p> }
                        {results.length > 0 && results.map(result => (
                            <PkmnRes key={result.name} meta={result} />
                        ))}
                    </div>
                </div>
                <Display results={results} />
            </AppWrap>
            }
        </AppContextProvider>
    )
}

export default App
