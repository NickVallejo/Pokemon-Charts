import React, {useContext} from 'react'
import AppContext from '../helpers/AppCtx'

function AppWrap(props) {
    const appCtx = useContext(AppContext)

    return (
        <div className="app-wrap" onClick={appCtx.selectOff}>
            {props.children}
        </div>
    )
}

export default AppWrap
