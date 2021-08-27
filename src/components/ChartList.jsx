import React, {useContext} from 'react'
import AppContext from '../helpers/AppCtx'
import ChartListItem from './ChartListItem'

function ChartList() {
    const appCtx = useContext(AppContext)

    const selectListItem = (index) => {
        appCtx.selectListItem(index)
    }
    
    return (
        <div>
            <ul>
                {appCtx.myChartList && appCtx.myChartList.map((chart, index) => (
                    <ChartListItem key={index} index={index} name={chart.name} select={selectListItem}/>
                ))}
            </ul>
        </div>
    )
}

export default ChartList