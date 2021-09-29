import React, {useState, useContext, useEffect, useCallback} from 'react'
import AppContext from '../helpers/AppCtx'
import ClickContext from '../helpers/ClickCtx'
import PkmnHover from './PkmnHover'
import pokeball from '../assets/pokeball.png'

function PkmnBox(props) {
    const {myPkmn, id} = props
    const appCtx = useContext(AppContext)
    const clickCtx = useContext(ClickContext)

    const addToChart = useCallback((index) => {
        //Shifting algorithm
        appCtx.setMyChart(prevChart => {
            const mutChart = {...prevChart}
            mutChart.chart[index] = clickCtx.selectedPkmn
            return mutChart
        })
        // clickCtx.setPkmnSelected(false)
        clickCtx.setSelectedPkmn(undefined)
    })

    const pkmnSetHandler = (e) => {
        if(!e.target.classList.contains('del-pkmn')){
            addToChart(id)
            clickCtx.pkmnClicked()
        }
    }

    const pkmnSwitch = (e) => {
        if(!e.target.classList.contains('del-pkmn')){
            if(props.pkmnSwitch){
                props.pkmnSwitcherInit(id)
            } else{
                props.pkmnSwitcherToggle(id)
            }
        } else{
            props.pkmnSwitchCancel()
        }
    }

    const pkmnDel = () => {
        appCtx.removePkmn(id)
    }

    return (
        <div className={`pkmn-box ${props.from === id && "res-clicked"}`} id={`pkmnBox-${id}`} onClick={clickCtx.selectedPkmn ? pkmnSetHandler : pkmnSwitch}>
            <img className='pokebox-bg' src={pokeball} alt="" />
            <div className="title-bar">
                <span className="rank">{parseInt(id)+1}</span>
                {myPkmn && <span className='del-pkmn' onClick={pkmnDel}>X</span>}
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
