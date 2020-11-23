import React from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'

//??? - this isn't quite working - did I not set things up correctly?
//come back when I've set up babel

const Navbar = () => (
  <header
    //similar to styled-components
    css={css`
      background-color: 'pink';
      padding: 15px;
    `}
  >
    <Link to="/">Adopt Me!</Link>
    <span role="img" aria-label="logo"></span>
  </header>
)

export default Navbar