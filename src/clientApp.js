import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

// any other browser-only stuff

hydrate(<App/>, document.getElementById('root'))
// ^ like render - but knows markup will be there already
// ... so take over when it's done loading that.