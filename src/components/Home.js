import React from 'react'
import Logo from '../images/city.png'

const Home = () => (
  <section className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container" id="logo">

        <figure className="image is-128x128 has-text-centered" >
          <img src={Logo} alt=""/>
        </figure>
        
        <div className="title">Metropolists</div>

        <p className="subtitle">Find your next home</p>
      </div>
    </div>
  </section>
)

export default Home