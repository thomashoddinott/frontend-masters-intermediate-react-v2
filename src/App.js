import React, { useState } from 'react'
import SearchParams from './components/SearchParams'
import './App.css';
import { Link, Router } from '@reach/router'
import Details from './components/Details';
import ThemeConext from './context/ThemeContext'


function App() {
  const themeHook = useState('darkblue')
  //const [themeHook, setThemeHook] = ^
  return (
    <ThemeConext.Provider value={themeHook}>
    <header>
      <Link to='/'>Adopt Me!</Link>
    </header>
      <Router>
        <SearchParams path='/'/>
        <Details path='/details/:id'/>
      </Router>
    </ThemeConext.Provider>
  );
}

export default App;
