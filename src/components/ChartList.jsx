import React, {useContext} from 'react'
import AppContext from '../helpers/AppCtx'
import SlideContext from '../helpers/SlideCtx'
import ChartListItem from './ChartListItem'
import ChartLoader from './ChartLoader'

function ChartList() {
    const appCtx = useContext(AppContext);
    const slideCtx = useContext(SlideContext);

    const selectListItem = (index) => {
        appCtx.selectListItem(index)
        slideCtx.closeSlideHandler('chart')
    }

    const deleteListItem = (index) => {
        appCtx.deleteListItem(index)
    }

    const downloadListItem = (index) => {
        appCtx.downloadListItem(index)
    }

    const passUpSlide = () => {
        slideCtx.closeSlideHandler('chart')
    }
    
    return (
        <div className={`chart-slide ${slideCtx.chartSlide ? 'show-charts' : ''}`}>
            <i className="fas fa-times fa-2x" onClick={passUpSlide}></i>
            <ChartLoader />
            <a style={{display: 'none'}} id="downloadEl"></a>
            <ul className='chart-list'>
                {appCtx.myChartList.length === 0 &&
                   <p className="no-charts-txt">No charts yet! Give your chart a name to save it!</p>
                }
                {appCtx.myChartList && appCtx.myChartList.map((chart, index) => (
                    <ChartListItem key={index} index={index} name={chart.name} download={downloadListItem} select={selectListItem} delete={deleteListItem}/>
                ))}
            </ul>
        </div>
    )
}

export default ChartList