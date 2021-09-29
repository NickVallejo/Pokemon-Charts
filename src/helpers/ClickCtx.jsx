import React, {useState, useEffect, useCallback} from 'react';

const ClickContext = React.createContext()

export const ClickContextProvider = props => {
    //const [pkmnSelected, setPkmnSelected] = useState(false)
    const [selectedPkmn, setSelectedPkmn] = useState(undefined)
   
    const pkmnClicked = useCallback((pkmnMeta) => {
        console.log('clicked pokemon clicked', pkmnMeta)
        setSelectedPkmn(pkmnMeta)
        // setPkmnSelected(true)
    })

    // const pkmnSwitched = useCallback(() => {
    //     setSelectedPkmn(undefined)
    // })

    const selectOff = useCallback((e) => {
        console.log('SELECT OFF', e)
        if(e.target.closest('.search-wrap') !== null 
        || e.target.closest('.pkmn-box') && !selectedPkmn
        || e.target.closest('.pkmn-display')){
            return
        }

        //setPkmnSelected(false)
        setSelectedPkmn(undefined)
    })

    return <ClickContext.Provider value = {{
        // pkmnSelected,
        selectedPkmn,
        selectOff,
        pkmnClicked,
        // setPkmnSelected,
        // pkmnSwitched,
        setSelectedPkmn
    }}>{props.children}</ClickContext.Provider>
}

export default ClickContext