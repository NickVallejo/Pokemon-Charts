import React from 'react'

function ChartListItem(props) {

    const clickHandler = () => {
        props.select(props.index)
    }
    const delHandler = () => {
        props.delete(props.index)
    }

    const dlHandler = () => {
        props.download(props.index)
    }

    return (
        <li className="chart-list-li">
            <span onClick={clickHandler}>{props.name}</span>
            <div class="li-opts">
                <i class="fas fa-file-export" onClick={dlHandler}></i>
                <i class="fas fa-trash-alt" onClick={delHandler}></i>
            </div>
        </li>
    )
}

export default ChartListItem
