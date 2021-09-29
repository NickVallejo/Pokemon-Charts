import React, {useContext} from 'react'
import { pokeRegions, pokeTypes } from '../helpers/pokeRegions'
import FilterBoxes from './FilterBoxes'
import SlideContext from '../helpers/SlideCtx'

function FilterSidebar({filter, filterChange, setFilter}) {
    const slideCtx = useContext(SlideContext)
    
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
                    newFilter[filterType].splice(newFilter[filterType].indexOf(name), 1)
                    return newFilter
                })
            }
        }
    }

    const passUpSlide = () => {
        slideCtx.closeSlideHandler('filter')
    }

    const regionNames = Object.keys(pokeRegions)

    return (
        <div className={`filter-slide ${slideCtx.filterSlide ? 'show-filter' : ''}`}>
            <i className="fas fa-times fa-2x" onClick={passUpSlide}></i>
            <div className="check-filter">
            <h3>Regions</h3>
            <ul className="region-list">
                {regionNames.map(name => <FilterBoxes key={name} filterType='regions' filter={filter} name={name} changeFilter={changeFilter}/>)}
            </ul>
            <h3>Types</h3>
            <ul className="type-list">
                {pokeTypes.map(name => <FilterBoxes key={name} filterType='types' filter={filter} name={name} changeFilter={changeFilter}/>)}
            </ul>
            <button onClick={filterChange}>Filter</button>
            </div>
        </div>
    )
}

export default FilterSidebar
