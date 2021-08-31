import React, {useState, useRef, useEffect, useContext} from 'react'
import PkmnRes from './PkmnRes'
import axios from 'axios'

function Search(props) {
    const [currentSrc, setCurrentSrc] = useState()
    const srcInput = useRef()

    useEffect(async () => {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentSrc}`)

        const pkmnRes = req.data
        props.resultsSetContext(pkmnRes)

    }, [currentSrc])

    const updateRes = (e) => {
        e.preventDefault()
        const src = srcInput.current.value
        setCurrentSrc(src)
    }

    console.log(props.results, 'RESULTS')
    return (
        <div className="search-wrap">
            <form action="">
            <input ref={srcInput} type="text"/>
            <button type='submit' onClick={updateRes}>Search</button>
            </form>

            <div className="search-display">
                {!props.results && <p>No results found</p>}
                {props.results && <PkmnRes key={props.results.name} results={props.results} />}
            </div>
        </div>
    )
}

export default Search
