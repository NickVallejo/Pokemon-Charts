import React, {useState, useRef, useEffect, useContext} from 'react'
import AppContext from '../helpers/AppCtx'
import PkmnRes from './PkmnRes'
import axios from 'axios'

function Search(props) {
    const [currentSrc, setCurrentSrc] = useState()
    const srcInput = useRef()

    const appCtx = useContext(AppContext)

    useEffect(async () => {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentSrc}`)

        const pkmnRes = req.data
        appCtx.resultsSetContext(pkmnRes)

    }, [currentSrc])

    const updateRes = (e) => {
        e.preventDefault()
        const src = srcInput.current.value
        setCurrentSrc(src)
    }

    console.log(appCtx.results, 'RESULTS')
    return (
        <div className="search-wrap">
            <form action="">
            <input ref={srcInput} type="text"/>
            <button type='submit' onClick={updateRes}>Search</button>
            </form>

            <div className="search-display">
                {!appCtx.results && <p>No results found</p>}
                {appCtx.results && <PkmnRes key={appCtx.results.name} results={appCtx.results} />}
            </div>
        </div>
    )
}

export default Search
