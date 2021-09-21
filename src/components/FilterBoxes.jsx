import React, {useState, useEffect} from 'react'

function FilterBoxes({filter, name, changeFilter, filterType}) {

    const [checked, setChecked] = useState(false)

    const inFilter = (name) => {
        if(filter[filterType].includes(name)){
            return 'checked'
        }

        return false
    }

    const changeFilterHandler = () => {
        changeFilter(checked, name, filterType)
    }

    useEffect(() => {
        setChecked(inFilter(name))
    }, [name, filter])

    return (
        <li><input type='checkbox' id={name} value={name} checked={checked} onChange={changeFilterHandler}/><label htmlFor={name}>{name}</label></li>
    )
}

export default FilterBoxes
