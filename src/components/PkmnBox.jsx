import React, {useState, useContext, useEffect} from 'react'
import AppContext from '../helpers/AppCtx'
import PkmnHover from './PkmnHover'
import pokeball from '../assets/pokeball.png'

function PkmnBox(props) {
    const {myPkmn, id} = props
    const appCtx = useContext(AppContext)

    const pkmnSetHandler = () => {
            appCtx.addToChart(id)
            appCtx.pkmnClicked()
    }

    const pkmnSwitch = () => {
        if(props.pkmnSwitch){
            props.pkmnSwitcherInit(id)
        } else{
            props.pkmnSwitcherToggle(id)
        }
    }

    const pkmnDel = () => {
        appCtx.removePkmn(id)
    }

    return (
        <div className={`pkmn-box ${props.from === id && "res-clicked"}`} id={`pkmnBox-${id}`} onClick={appCtx.pkmnSelected ? pkmnSetHandler : pkmnSwitch}>
            <img class='pokebox-bg' src={pokeball} alt="" />
            <div className="title-bar">
                <span className="rank">{parseInt(id)+1}</span>
                {myPkmn && <span onClick={pkmnDel}>X</span>}
            </div>
            {myPkmn &&
            <div className="pkmn-box-info">
                <img src={`${myPkmn.sprites.normal}`} alt="" />
                <h4>{myPkmn.name}</h4>
            </div>
            }
            {myPkmn && <PkmnHover pkmnStats={myPkmn}/>}
        </div>
    )
}

export default PkmnBox
