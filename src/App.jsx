import React, { useState, useContext, useEffect, useMemo, useCallback} from 'react'
import Search from './components/Search'
import Display from './components/Display'
import { AppContextProvider } from './helpers/AppCtx'
import AppWrap from './components/AppWrap'
import ChartList from './components/ChartList'
import axios from 'axios'
import PkmnRes from './components/PkmnRes'
import './App.css'

function App() {
    const [results, setResults] = useState([])
    const [didLoad, setDidLoad] = useState(false)

    const resultData = useCallback(async() => {
            const req = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=61')
            const pkmnRes = req.data.results
        
            setResults(pkmnRes)
            setDidLoad(true)
    }, [])

    useEffect(() => {
        resultData()
    }, [])

    return (
        <AppContextProvider>
            {!didLoad ? 
            <p>Loading...</p> : 
            <AppWrap>
                <div className="res-and-list">
                    <ChartList />
                    <div className="search-display">
                        {results.length > 0 && results.map(result => (
                            <PkmnRes key={result.name} url={result.url} />
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
