import React, {useState, useEffect, useCallback} from 'react'

function FilterBoxes({filter, name, changeFilter, filterType}) {

    const [checked, setChecked] = useState(false)

    const inFilter = useCallback((name) => {
        if(filter[filterType].includes(name)){
            return 'checked'
        }

        return false
    })

    const changeFilterHandler = () => {
        changeFilter(checked, name, filterType)
    }

    useEffect(() => {
        setChecked(inFilter(name))
    }, [name, filter, inFilter])

    return (
        <li><input type='checkbox' id={name} value={name} checked={checked} onChange={changeFilterHandler}/><label htmlFor={name}>{name}</label></li>
    )
}

export default FilterBoxes
