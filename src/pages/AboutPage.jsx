import React from 'react'
import Card from '../components/shared/Card'
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>
          About
        </h1>
        <Link to='/'> Go back</Link>
      </div>
    </Card>
  )
}

export default AboutPage