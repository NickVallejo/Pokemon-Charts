import React, {useState, useContext, useEffect} from 'react'
import AppContext from '../helpers/AppCtx'

function PkmnBox(props) {
    const {myPkmn} = props
    const appCtx = useContext(AppContext)

    const pkmnSetHandler = () => {
            console.log('ID THAT WAS PASSEd', props.id)
            appCtx.addToChart(props.id, appCtx.results)
            appCtx.pkmnClicked()
    }

    const pkmnSwitch = () => {
        if(props.pkmnSwitch){
            props.pkmnSwitcherInit(props.id)
        } else{
            props.pkmnSwitcherToggle(props.id)
        }
    }

    const pkmnDel = () => {
        appCtx.removePkmn(props.id)
    }

    return (
        <div className={`pkmn-box ${props.from === props.id && "res-clicked"}`} id={`pkmnBox-${props.id}`} onClick={appCtx.pkmnSelected ? pkmnSetHandler : pkmnSwitch}>
            <div className="title-bar">
                <span className="rank">{parseInt(props.id)+1}</span>
                {myPkmn && <span onClick={pkmnDel}>X</span>}
            </div>
            {myPkmn &&
            <div className="pkmn-box-info">
                <img src={`${myPkmn.sprites.normal}`} alt="" />
                <h4>{myPkmn.name}</h4>
            </div>
            }
        </div>
    )
}

export default PkmnBox
