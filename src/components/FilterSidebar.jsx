import React, {useContext, useState, useEffect} from 'react'
import { pokeRegions, pokeTypes } from '../helpers/pokeRegions'
import AppContext from '../helpers/AppCtx'
import FilterBoxes from './FilterBoxes'

function FilterSidebar({filter, filterChange}) {
    console.log(filter, 'FILTER IN SIDEBAR')
    const [mockFilter, setMockFilter] = useState(filter)

    const passUpFilter = () => {
        filterChange(mockFilter)
    }  

    useEffect(() => {
        console.log(mockFilter)
    }, [mockFilter])

    const changeFilter = (checked, name, filterType) => {
        if(checked == false){
            setMockFilter(prevFilter => {
                const newFilter = {...prevFilter}
                console.log(newFilter, filterType)
                newFilter[filterType].push(name)
                return newFilter
            })
        } else{
            if(mockFilter[filterType].includes(name)){
                setMockFilter(prevFilter => {
                    const newFilter = {...prevFilter}
                    console.log(newFilter, filterType)
                    newFilter[filterType].splice(newFilter[filterType].indexOf(name), 1)
                    return newFilter
                })
            }
        }
    }

    const regionNames = Object.keys(pokeRegions)

    return (
        <div className='filter-sidebar'>
            <ul className="region-list">
                {regionNames.map(name => <FilterBoxes key={name} filterType='regions' filter={mockFilter} name={name} changeFilter={changeFilter}/>)}
            </ul>

            <ul className="type-list">
                {pokeTypes.map(name => <FilterBoxes key={name} filterType='types' filter={mockFilter} name={name} changeFilter={changeFilter}/>)}
            </ul>

            <button onClick={passUpFilter}>Filter</button>
        </div>
    )
}

export default FilterSidebar
