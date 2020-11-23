import React, { useState, FunctionComponent, Dispatch } from 'react'

//create a 'generic' dropdown hook
const useDropdown = (label: string, defaultState: any, options: string[]) => {
  const [state, setState] = useState(defaultState)
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`

  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
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
  return [state, Dropdown, setState] as [string, FunctionComponent, Dispatch<string>]
}

export default useDropdown