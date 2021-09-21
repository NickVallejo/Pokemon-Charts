import React, {useContext, useState, useEffect} from 'react'
import { pokeRegions, pokeTypes } from '../helpers/pokeRegions'
import AppContext from '../helpers/AppCtx'
import FilterBoxes from './FilterBoxes'
import Search from './Search'

function FilterSidebar({filter, filterChange, setSrc, src, srcChange}) {
    console.log(filter, 'FILTER IN SIDEBAR')
    const [mockFilter, setMockFilter] = useState(filter)

    const passUpFilter = () => {
        filterChange(mockFilter)
    }
    
    const passUpSrc = () => {
        srcChange()
    }

    const changeFilter = (checked, name, filterType) => {
        if(checked == false){
            setMockFilter(prevFilter => {
                const newFilter = {...prevFilter}
                if(name === 'all'){
                    newFilter[filterType] = [name]
                    return newFilter
                } else{
                    newFilter[filterType].includes('all') &&
                    newFilter[filterType].splice(newFilter[filterType].indexOf('all'), 1)
                    newFilter[filterType].push(name)
                    return newFilter
                }
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
            <Search src={src} setSrc={setSrc} passUpSrc={passUpSrc}/>
            <div className="check-filter">
            <ul className="region-list">
                {regionNames.map(name => <FilterBoxes key={name} filterType='regions' filter={mockFilter} name={name} changeFilter={changeFilter}/>)}
            </ul>

            <ul className="type-list">
                {pokeTypes.map(name => <FilterBoxes key={name} filterType='types' filter={mockFilter} name={name} changeFilter={changeFilter}/>)}
            </ul>

            <button onClick={passUpFilter}>Filter</button>
            </div>
        </div>
    )
}

export default FilterSidebar
