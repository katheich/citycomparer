import React from 'react'

const Home = (logo) => (
  <section className="hero is-fullheight-with-navbar">
    {console.log(logo)}
    <div className="hero-body">
      <div className="container" id="logo">

        <figure className="image is-128x128 has-text-centered" >
          <img src={logo} alt=""/>
        </figure>
        
        <div className="title">Metropolists</div>

        <p className="subtitle">Find your next home</p>
      </div>
    </div>
  </section>
)

export default Home