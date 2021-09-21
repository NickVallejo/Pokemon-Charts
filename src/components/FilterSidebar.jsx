import React from 'react'
import { pokeRegions, pokeTypes } from '../helpers/pokeRegions'
import FilterBoxes from './FilterBoxes'
import Search from './Search'

function FilterSidebar({filter, filterChange, setSrc, src, srcChange, setFilter}) {
    
    const changeFilter = (checked, name, filterType) => {
        if(checked === false){
            setFilter(prevFilter => {
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
            if(filter[filterType].includes(name)){
                setFilter(prevFilter => {
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
            <Search src={src} setSrc={setSrc} passUpSrc={srcChange}/>
            <div className="check-filter">
            <ul className="region-list">
                {regionNames.map(name => <FilterBoxes key={name} filterType='regions' filter={filter} name={name} changeFilter={changeFilter}/>)}
            </ul>

            <ul className="type-list">
                {pokeTypes.map(name => <FilterBoxes key={name} filterType='types' filter={filter} name={name} changeFilter={changeFilter}/>)}
            </ul>

            <button onClick={filterChange}>Filter</button>
            </div>
        </div>
    )
}

export default FilterSidebar
