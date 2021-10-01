import React, { useState, useEffect, useCallback} from 'react'
import Display from './components/Display'
import { AppContextProvider } from './helpers/AppCtx'
import { ClickContextProvider } from './helpers/ClickCtx'
import AppWrap from './components/AppWrap'
import ChartList from './components/ChartList'
import PkmnRes from './components/PkmnRes'
import { pokeRegions} from './helpers/pokeRegions'
import './App.css'
import FilterSidebar from './components/FilterSidebar'
import pokemon from "./assets/pokemon.json";
import ResWrap from './components/ResWrap'
import Search from './components/Search'
import { SlideContextProvider } from './helpers/SlideCtx'
import SlideBtns from './components/SlideBtns'

function App() {
    const [filter, setFilter] = useState({regions: ['kanto'], types: ['all']})
    const [src, setSrc] = useState('')
    const [results, setResults] = useState([])
    const [didLoad, setDidLoad] = useState(false)
    const [scrolling, setScrolling] = useState(false)
    let scrollY = window.scrollY

    const scrollCheck = () => {
        scrollY = window.scrollY
        scrollY > 0 ? setScrolling(true) : setScrolling(false)
    }

    // RETURNS RESULTS BASED ON FILTER
    const resultData = useCallback(() => {
        let pkmnRes = []
        setDidLoad(false)

        if(filter.regions.length > 0){
            for(const region of filter.regions){
                const filtRegion = pokeRegions[region]
                for(let i = filtRegion.offset; i < filtRegion.offset + filtRegion.limit; i++){
                    if(filter.types.length && !filter.types.includes('all')){
                        const found = pokemon[i].types.some(type => filter.types.includes(type)) 
                        found && pkmnRes.push(pokemon[i])
                        continue
                    }
                    pkmnRes.push(pokemon[i])
                }
            }
        }
        
        setResults(pkmnRes)
        setDidLoad(true)
    }, [filter])

    // RETURNS RESULTS BASED ONLOAD
    useEffect(() => {
        window.addEventListener('scroll', scrollCheck)
        scrollCheck()
        resultData()
    }, [])

    // RETURNS RESULTS BASED ON SEARCH
    const srcChange = () => {
        if(src !== ''){
            const srcFormat = src.replace(' ', '-').toLowerCase()
            console.log(srcFormat, 'SEARCH')
            const found = pokemon.filter(pkmn => pkmn.name.startsWith(srcFormat))
            found.length > 0 ? setResults(found) : setResults([])
        }
        setSrc('')
    }

    return (
        <AppContextProvider>
            <ClickContextProvider>
                {didLoad &&
                <AppWrap>
                    <div className={`res-and-list ${scrolling ? 'res-and-list-scroll' : ''}`}>
                        <SlideContextProvider>
                            <SlideBtns />
                            <FilterSidebar setFilter={setFilter} filter={filter} filterChange={resultData} src={src} setSrc={setSrc} srcChange={srcChange}/>
                            <ChartList />
                        </SlideContextProvider>
                        <Search backToFilter={resultData} src={src} setSrc={setSrc} passUpSrc={srcChange}/>
                        <ResWrap results={results}/>
                    </div>
                    <Display/>
                </AppWrap>
                }
            </ClickContextProvider>
        </AppContextProvider>
    )
}

export default App
