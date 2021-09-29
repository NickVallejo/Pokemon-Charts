import React, {useRef} from 'react'

function Search({src, setSrc, passUpSrc}) {
    const srcInput = useRef()

    const updateRes = () => {
        setSrc(srcInput.current.value)
    }

    const srcFilter = (e) => {
        if(srcInput.current.value !== '' && e.key === 'Enter'){
            passUpSrc()
        }
    }

    return (
            <div className="src-filter">
                <input class='pkmn-input' ref={srcInput} onChange={updateRes} onKeyDown={srcFilter} type="text" value={src} placeholder='Search for a Pokemon...'/>
            </div>
    )
}

export default Search
