import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => (
  <h2 style={{ textAlign: 'center' }}>
    Sorry! We can't find that page. Try returning to <Link class='link' style={{ color: 'grey' }} to='/'> home. </Link>
  </h2>
)

export default NoMatch