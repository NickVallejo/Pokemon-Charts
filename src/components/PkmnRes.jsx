import React, { useCallback, useContext, useEffect, useState } from 'react'
import AppContext from '../helpers/AppCtx'
import PkmnHover from './PkmnHover'
import axios from 'axios'

function PkmnRes(props) {
    const appCtx = useContext(AppContext)
    const [pkmnMeta, setPkmnMeta] = useState()
    const [imClicked, setImClicked] = useState(false)
    console.log(pkmnMeta, 'PKMNRES META')

    useEffect(() => { 
        (!appCtx.pkmnSelected && imClicked) && setImClicked(false)
    }, [appCtx.pkmnSelected])

    const getPoke = useCallback(async() => {
        const pkmnReturn = await axios.get(props.url)
        const pkmn = pkmnReturn.data
  
        let statsArray = []
        let typeArray = []
       
        pkmn.stats.forEach(stat => {
            statsArray.push({ statName: stat.stat.name, statBase: stat.base_stat })
        })
       
        pkmn.types.forEach(type => {
            typeArray.push(type.type.name)
        })
       
        const pkmnToAdd = {
            name: pkmn.name,
            stats: statsArray,
            sprites: { normal: pkmn.sprites.front_default, shiny: pkmn.sprites.front_shiny },
            id: pkmn.id,
            types: typeArray
        }
  
        setPkmnMeta(pkmnToAdd)
    })

    useEffect(async() => {
      getPoke()
    }, [])

    const pkmnClickHandler = () => {
        setImClicked(true)
        appCtx.pkmnClicked(pkmnMeta)
    }

    if(pkmnMeta){
        return (
            <div className={`pkmn-display${imClicked ? ' res-clicked' : ''}`} onClick={pkmnClickHandler}>
                <img src={`${pkmnMeta.sprites.normal}`} />
                <h4>{pkmnMeta.name} - {pkmnMeta.id}</h4>
                {pkmnMeta && <PkmnHover pkmnStats={pkmnMeta}/>}
                {/* <div className="pkmn-meta">
                    <h6>Stats</h6>
                    <ul>
                        {pkmnMeta.stats.map(stat => <li key={stat.statName}>{stat.statName} - {stat.statBase}<div className="stat-bar"><div className="stat-climb" style={{ width: (stat.statBase / 255) * 100 + '%' }}></div></div></li>)}
                    </ul>
                    <h6>Types</h6>
                    <ul>
                        {pkmnMeta.types.map(type => <li key={type}>{type}</li>)}
                    </ul>
                </div> */}
            </div>             
         )
    } else{
        return(
            <p>Loading...</p>
        )
    }
}

export default PkmnRes
