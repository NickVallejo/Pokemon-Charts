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
import Pokemon from "./assets/pokemon.json";

function App() {
    let allPokemon;
    const [filter, setFilter] = useState({regions: ['kanto'], types: []})
    const [results, setResults] = useState([])
    const [didLoad, setDidLoad] = useState(false)

    useEffect(async() => {
        console.log('ON BOOT', Pokemon)
        // const res = await fetch("./assets/pokemon.json", {
        //     headers : { 
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //        }
        // })
        // allPokemon = await res.json()
        // console.log('ON BOOT', allPokemon)
    }, [])

    const resultData = useCallback(async() => {
        let pkmnRes = []
        setDidLoad(false)

        console.log()
        try{
            for(const region of filter.regions){
                const filtRegion = pokeRegions[region]
                const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${filtRegion.offset}&limit=${filtRegion.limit}`)
                console.log('WHAT WE GOT BACK', req.data.results, filtRegion.offset, filtRegion.limit)
                pkmnRes = [...pkmnRes, ...req.data.results]
            }

            console.log(pkmnRes, 'AFTER PUSH')
            let pkmnData = []

            for(const pkmnCall of pkmnRes){
                let typeArray = []
                let statsArray = []
                const pkmnReturn = await axios.get(pkmnCall.url)
                const pkmn = pkmnReturn.data

                pkmn.types.forEach(type => {
                    typeArray.push(type.type.name)
                })

                if(filter.types.length && !typeArray.some(type => filter.types.includes(type))) continue

                pkmn.stats.forEach(stat => {
                    statsArray.push({ statName: stat.stat.name, statBase: stat.base_stat })
                })

                const pkmnToAdd = {
                    name: pkmn.name,
                    stats: statsArray,
                    sprites: { normal: pkmn.sprites.front_default, shiny: pkmn.sprites.front_shiny },
                    id: pkmn.id,
                    types: typeArray
                }

                pkmnData.push(pkmnToAdd)
                console.log('TADAA!! Filtered pokemon data', pkmnData)
            }

            console.log('TADAA!! Filtered pokemon data', JSON.stringify(pkmnData))
            
            setResults(pkmnData)
            setDidLoad(true)
        } catch(err){
            console.log('Bumped into a propblem', err)
        }
    }, [filter])

    useEffect(() => {
        console.log('new filter', filter)
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
