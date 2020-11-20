// mostly code from https://reactjs.org/docs/error-boundaries.html
// n.b. you can't do this in Hooks

import React, { Component } from 'react'
import { Link } from '@reach/router'

export default class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError () {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to='/'>Click here</Link> to go back to the home page, or wait 5 seconds.
        </h1>
      )
    }

    return this.props.children
  }
}


