import React, {useState, useContext} from 'react'
import Search from './components/Search'
import Display from './components/Display'
import { AppContextProvider } from './helpers/AppCtx'
import AppWrap from './components/AppWrap'
import ChartList from './components/ChartList'
import './App.css'

function App() {

    return (
        <AppContextProvider>
            <AppWrap>
                <ChartList />
                <Search/>
                <Display/>
            </AppWrap>
        </AppContextProvider>
    )
}

export default App
