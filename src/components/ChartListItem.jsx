import React from 'react'

function ChartListItem(props) {

    const clickHandler = () => {
        props.select(props.index)
    }
    return (
        <li className='chart-list-li' onClick={clickHandler}>{props.name}</li>
    )
}

export default ChartListItem
