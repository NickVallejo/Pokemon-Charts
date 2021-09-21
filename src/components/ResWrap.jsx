import React from 'react'
import PkmnRes from './PkmnRes'

function ResWrap({results}) {
    return (
        <div className="search-display">
            {results.length <= 0 && <p>No Pokemon Found...</p> }
            {results.length > 0 && results.map(result => <PkmnRes key={result.name} meta={result} />)}
        </div>
    )
}

export default ResWrap
