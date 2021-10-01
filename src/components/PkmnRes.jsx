import React, {useContext, useEffect, useState, useCallback} from 'react'
import ClickContext from '../helpers/ClickCtx'
import PkmnHover from './PkmnHover'

function PkmnRes(props) {
    const clickCtx = useContext(ClickContext);
    const [pkmnMeta, setPkmnMeta] = useState(props.meta);
    const [imClicked, setImClicked] = useState(false);
    // console.log(pkmnMeta, 'PKMNRES META')

    useEffect(() => {
        //if pkmnselected was just changed to false and I'm clicked, set me to false
        // (!clickCtx.selectedPkmn && imClicked) && setImClicked(false)
        console.log('render res!')
        if(clickCtx.selectedPkmn !== pkmnMeta){setImClicked(false)}
    }, [clickCtx.selectedPkmn])

    const pkmnClickHandler = useCallback(() => {
        setImClicked(true)
        clickCtx.pkmnClicked(pkmnMeta)
    })

    if(pkmnMeta){
        return (
            <div className={`pkmn-display${imClicked ? ' res-clicked' : ''}`} onClick={pkmnClickHandler}>
                <img src={`${pkmnMeta.sprites.normal}`} />
                <h4>{pkmnMeta.name} - {pkmnMeta.id}</h4>
                {/* {pkmnMeta && <PkmnHover pkmnStats={pkmnMeta}/>} */}
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

export default React.memo(PkmnRes)
