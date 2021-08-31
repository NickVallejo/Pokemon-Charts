import React, {useState, useContext, useEffect} from 'react'
import AppContext from '../helpers/AppCtx'

function PkmnBox(props) {
    const {myPkmn, id, results} = props
    const appCtx = useContext(AppContext)

    const pkmnSetHandler = () => {
            console.log('ID THAT WAS PASSEd', id)
            appCtx.addToChart(id, results)
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
        </div>
    )
}

export default PkmnBox
