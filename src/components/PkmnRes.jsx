import React, {useContext} from 'react'
import AppContext from '../helpers/AppCtx'

function PkmnRes(props) {
    const {name, stats, sprites, id, types} = props.results
    const appCtx = useContext(AppContext)

    const pkmnClickHandler = () => {
        appCtx.pkmnClicked()
    }

    return (
        <div className={`pkmn-display ${appCtx.pkmnSelected && 'res-clicked' }`} onClick={pkmnClickHandler}>
            <img src={`${sprites.normal}`} />
            <h4>{name} - {id}</h4>
            <h6>Stats</h6>
            <ul>
                {stats.map(stat => <li key={stat.statName}>{stat.statName} - {stat.statBase}<div className="stat-bar"><div className="stat-climb" style={{width: (stat.statBase/255) * 100 + '%'}}></div></div></li>)}
            </ul>
            <h6>Types</h6>
            <ul>
                {types.map(type => <li key={type}>{type}</li>)}
            </ul>
        </div>
    )
}

export default PkmnRes
