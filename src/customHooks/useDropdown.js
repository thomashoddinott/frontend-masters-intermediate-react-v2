import React, { useState } from 'react'

//create a 'generic' dropdown hook
const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState)
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`

  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        data-testid={id}
        id = {id}
        value = {state}
        onChange = {e => setState(e.target.value)}
        onBlur = {e => setState(e.target.value)} //^ screen readers *
        disabled = {!options.length}
      >
        <option>All</option>
        {options.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </label>
  )
  return [state, Dropdown, setState]
}

export default useDropdown