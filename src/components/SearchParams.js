import React, { useState, useEffect, useContext } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from '../customHooks/useDropdown' //custom hook
import Results from './Results'
import ThemeContext from '../context/ThemeContext'

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA") //limited to `Seattle, WA` and `San Francisco, CA` to not hammer the API
  const [breeds, setBreeds] = useState([])
  const [animal, AnimalDropdown] = useDropdown("Animal", 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])
  const [theme, setTheme] = useContext(ThemeContext)

  //try to hit the API
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    })

    setPets(animals || [])
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreeds, setBreed]);
  //scheduled to render after everything else in the return below
  //great because you show the user something straightaway, then worry about fetching data, etc.
  //declare dependency - when do you want to update?

  return (
    <div className="search-params">
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          requestPets()
        }}
      >
        <label htmlFor="location">
          Location
          <input 
            id="location" 
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown/>
        <BreedDropdown/>
        <label htmlFor="theme">
          {/* //updating the theme - state persists after page navigations */}
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlue={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  ) 
}

export default SearchParams