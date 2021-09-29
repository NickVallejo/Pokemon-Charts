import React from 'react'
import pokeball from '../assets/pokeball.png'

function Header() {
    return (
        <div className="pc-header-wrap">
            <div className="logo-wrap">
                <img className='logo-img' src={pokeball} alt="logo-pokeball" />
                <h1 className='logo-title'>PokeCharts</h1>
            </div>
            <div className="promo-wrap">
            <i className="fab fa-github fa-2x"></i>
            </div>
        </div>
    )
}

export default Header
