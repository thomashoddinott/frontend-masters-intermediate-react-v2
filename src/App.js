import React, { useState } from 'react'
import SearchParams from './components/SearchParams'
import './App.css';
import { Router } from '@reach/router'
import Details from './components/Details';
import ThemeConext from './context/ThemeContext'
import Navbar from './components/Navbar';


function App() {
  const themeHook = useState('darkblue')
  //const [themeHook, setThemeHook] == ^
  return (
    <ThemeConext.Provider value={themeHook}>
      <Navbar/>
      <Router>
        <SearchParams path='/'/>
        <Details path='/details/:id'/>
      </Router>
    </ThemeConext.Provider>
  );
}

export default App;
