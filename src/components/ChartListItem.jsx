import React from 'react'

function ChartListItem(props) {

    const clickHandler = () => {
        props.select(props.index)
    }
    return (
        <li className="chart-list-li">
            <span onClick={clickHandler}>{props.name}</span>
            <div class="li-opts">
                <i class="fas fa-file-export"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </li>
    )
}

export default ChartListItem
