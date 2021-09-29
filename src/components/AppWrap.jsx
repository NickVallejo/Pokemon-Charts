import React, {useContext} from 'react'
import ClickContext from '../helpers/ClickCtx'

function AppWrap(props) {
    const clickCtx = useContext(ClickContext)
    
    return (
        <div className="app-wrap" onClick={clickCtx.selectOff}>
            {props.children}
        </div>
    )
}

export default AppWrap
