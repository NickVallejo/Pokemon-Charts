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
            <div className="li-opts">
                <i className="fas fa-file-export" onClick={dlHandler}></i>
                <i className="fas fa-trash-alt" onClick={delHandler}></i>
            </div>
        </li>
    )
}

export default ChartListItem
