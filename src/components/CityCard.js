import React from 'react'

const CityCard = ({ city, selection, handleDetails, handleSelect }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div className={`card ${selection.includes(city.slug) ? 'selected' : ''}`}>
      <div className="card-image">
        <figure className="image is-9by10">
          <img 
            src={city._embedded['ua:images'].photos[0].image.mobile} 
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="has-text-grey-darker is-size-6">{city.name}</p>
        <p className="has-text-grey-darker is-size-7">{city._links['ua:countries'][0].name}</p>
      </div>
      <footer className="card-footer">
        <a 
          className="card-footer-item is-size-5" 
          onClick={(e) => handleDetails(e)} 
          data-name={city.name}
          data-slug={city.slug}
        >
          <i className="fas fa-info-circle" data-name={city.name} data-slug={city.slug} />
        </a>
        <a 
          className="card-footer-item" 
          onClick={(e) => handleSelect(e)} 
          data-name={city.name}
          data-slug={city.slug}
        >
          {selection.includes(city.slug) ? <i className="fas fa-times-circle is-size-5" data-name={city.name} data-slug={city.slug} /> : <i className="fas fa-check-circle is-size-5"  data-name={city.name} data-slug={city.slug} />}
        </a>
      </footer>
    </div>
  </div>
)

export default CityCard