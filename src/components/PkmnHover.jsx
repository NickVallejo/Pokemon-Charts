import React from 'react'

function PkmnHover(props) {

    const pkmn = props.pkmnStats
    console.log('HERE IS WHAT PKMN STATS LOOKS LIKE', pkmn)
    return (
        <div class="poke-hover pkmn-meta">
           <ul class="stat-ul">
               {pkmn.stats.map(stat => <li key={stat.statName}><span>{stat.statName} - {stat.statBase}</span><div className="stat-bar"><div className="stat-climb" style={{ width: (stat.statBase / 255) * 100 + '%' }}></div></div></li>)}
           </ul>
           <ul class="type-ul">
               {pkmn.types.map(type => <li key={type}>{type}</li>)}
           </ul>
        </div>
    )
}

export default PkmnHover
