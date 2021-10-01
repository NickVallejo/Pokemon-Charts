import React, {useRef, useState} from 'react'

function Search({src, setSrc, passUpSrc, backToFilter}) {
    const [filterReturn, setFilterReturn] = useState(false)
    const srcInput = useRef()

    const updateRes = () => {
        setSrc(srcInput.current.value)
    }

    const srcFilter = (e) => {
        if(srcInput.current.value !== '' && e.key === 'Enter'){
            setFilterReturn(true)
            passUpSrc()
        }
    }

    const returnHandler = () => {
        backToFilter()
        setFilterReturn(false)
    }

    return (
            <div className="src-filter">
                {filterReturn && <span className="filter-return" onClick={returnHandler}><i class="fas fa-undo"></i> Return to Filter</span> }
                <input className='pkmn-input' ref={srcInput} onChange={updateRes} onKeyDown={srcFilter} type="text" value={src} placeholder='Search for a Pokemon...'/>
            </div>
    )
}

export default Search
