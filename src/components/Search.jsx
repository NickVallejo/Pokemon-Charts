import React, { useState, useRef, useEffect, useCallback} from 'react'
import PkmnRes from './PkmnRes'
import axios from 'axios'

function Search(props) {
    const [currentSrc, setCurrentSrc] = useState()
    const srcInput = useRef()
    const {results} = props

    useEffect(() => {
        // results.sort((a, b) => {
        //     if(a.id > b.id){
        //         return 1
        //     } else{
        //         return -1
        //     }
        // })
        console.log('RESULTS IN SEARCH AFTER SORT', props.results[1])
    }, [])

    // const updateRes = (e) => {
    //     e.preventDefault()
    //     const src = srcInput.current.value
    //     setCurrentSrc(src)
    // }

    return (
        <div className="search-wrap">
            <form action="">
                <input ref={srcInput} type="text" />
                {/* <button type='submit' onClick={updateRes}>Search</button> */}
            </form>

            <div className="search-display">
                {results && results.length > 0 && results.map(result => (
                    <PkmnRes key={result.name} result={result} />
                ))}
            </div>
        </div>
    )
}

export default Search
