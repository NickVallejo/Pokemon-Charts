import React, {useState, useCallback} from 'react';

const ClickContext = React.createContext()

export const ClickContextProvider = props => {
    //const [pkmnSelected, setPkmnSelected] = useState(false)
    const [selectedPkmn, setSelectedPkmn] = useState(undefined)
    const [pkmnSwitch, setPkmnSwitch] = useState(false)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
   
    const pkmnClicked = useCallback((pkmnMeta) => {
        setSelectedPkmn(pkmnMeta)
    })

    const selectOff = useCallback((e) => {
        console.log('SELECT OOOOOOOOOOOOOOFF', e.target)
        if(e.target.closest('.search-wrap') !== null 
        || e.target.closest('.pkmn-box') && !selectedPkmn
        || e.target.closest('.pkmn-display')){
            return
        }

        pkmnSwitchCancel()
        setSelectedPkmn(undefined)
    })

    const pkmnSwitcherInit = (id) => {
        if(pkmnSwitch){
            setTo(id)
        }
    }

    const pkmnSwitcherToggle = (id) => {
        setPkmnSwitch(true)
        setFrom(id)
    }

    const pkmnSwitchCancel = () => {
        setPkmnSwitch(false)
        setFrom('')
        setTo('')
    }

    return <ClickContext.Provider value = {{
        // pkmnSelected,
        selectedPkmn,
        pkmnSwitch,
        from,
        to,
        selectOff,
        pkmnClicked,
        setSelectedPkmn,
        pkmnSwitchCancel,
        pkmnSwitcherToggle,
        pkmnSwitcherInit
    }}>{props.children}</ClickContext.Provider>
}

export default ClickContext