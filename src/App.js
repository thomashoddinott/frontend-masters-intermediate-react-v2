import React, { useState, lazy, Suspense } from 'react'
//import SearchParams from './components/SearchParams'
import './App.css';
import { Link, Router } from '@reach/router'
// import Details from './components/Details';
import ThemeConext from './context/ThemeContext'

//component has no concept of being dynamically loaded
const Details = lazy(() => import('./components/Details'))
const SearchParams = lazy(() => import('./components/SearchParams'))

function App() {
  const themeHook = useState('darkblue')
  //const [themeHook, setThemeHook] == ^
  return (
    <ThemeConext.Provider value={themeHook}>
    <header>
      <Link to='/'>Adopt Me!</Link>
    </header>
    <Suspense fallback={<h1>loading ...</h1>}>
      <Router>
        <SearchParams path='/'/>
        <Details path='/details/:id'/>
      </Router>
    </Suspense>
    </ThemeConext.Provider>
  );
}

export default App;
