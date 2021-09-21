import React, {useRef} from 'react'

function Search({src, setSrc, passUpSrc}) {
    const srcInput = useRef()

    const updateRes = () => {
        setSrc(srcInput.current.value)
    }

    const srcFilter = () => {
        if(srcInput.current.value !== ''){
            passUpSrc()
        }
    }

    return (
            <div className="src-filter">
                <input ref={srcInput} onChange={updateRes} type="text" value={src}/>
                <button type='submit' onClick={srcFilter}>Search</button>
            </div>
    )
}

export default Search
