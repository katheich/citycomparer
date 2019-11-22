import React from 'react'

import Axios from 'axios'

import CityModal from './CityModal'
import CityCard from './CityCard'


class Cities extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [],
      errors: {},
      filters: {
        continent: 'All',
        search: ''
      },
      selection: [],
      modal: false,
      modalInfo: []
    }
  }

  componentDidMount() {
    Axios.get('https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images')
      .then(resp => {
        const data = resp.data._embedded['ua:item']
        this.setState({ data })
      })
      .catch(err => this.setState({ errors: err.response.status }))
  }

  handleCompare() {
    if (this.state.selection.length === 2) {
      const path = `/${this.state.selection[0]}/${this.state.selection[1]}`
      this.props.history.push(path)
    }
  }

  handleSelect(e) {
    let slug
    e.target.name ? slug = e.target.name : slug = e.target.id
    console.log(slug)

    let selection = [...this.state.selection]

    if (this.state.selection.includes(slug)) {

      selection = this.state.selection.filter((elem) => {
        return !(elem === slug)
      })

      this.setState({ selection })

    } else {
      selection.push(slug)
      this.setState({ selection })
    }    
  }

  handleDetails(e) {
    const city = [e.target.name, e.target.id]
    
    this.setState({
      modalInfo: city
    })

    this.toggleModal()
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  filterCities() {
    const re = new RegExp(this.state.filters.search, 'i')
    return this.state.data.filter(city => {
      return (city.continent === this.state.filters.continent || this.state.filters.continent === 'All') && (re.test(city._links['ua:countries'][0].name) || re.test(city.name))
    })
  }

  handleContinentSelect(e) {
    console.log(e.target.value)
    const filters = { ...this.state.filters }
    filters.continent = e.target.value
    this.setState({ filters })
  }

  handleSearch(e) {
    const filters = { ...this.state.filters }
    filters.search = e.target.value
    this.setState({ filters })
  }


  render() {
    return (<>
        <div className="level" id="sticky">

          <div className="level-left">
            <div className="level-item">
              <button 
                className="button is-info" 
                onClick={() => this.handleCompare()}
                disabled={(this.state.selection.length === 2) ? '' : 'disabled'}>
                  Compare
              </button>
            </div>

            {!(this.state.selection.length === 0) ? <div className="level-item"> {this.state.selection.map((name, i) => {
              return <span key={i} className="tag is-link" id={name} onClick={(e) => this.handleSelect(e)}>#{name}</span>
            })} </div> : <p className="is-size-7">Select any two cities to compare</p>}
          </div>

          <div className="level-right">
            <div className="level-item">
              <div className="field">
                <div className="control">
                  <div className="select is-info">
                    <select onChange={(e) => this.handleContinentSelect(e)}>
                      <option value="All">Continents</option>
                      <option value="Africa">Africa</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="North America">North America</option>
                      <option value="Oceania">Oceania</option>
                      <option value="South America">South America</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="level-item">
              <div className="field">
                <div className="control">
                  <input className="input is-info" type="text" placeholder="Search city/country..." onChange={(e) => this.handleSearch(e)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="columns is-mobile is-multiline">
              {this.filterCities().map((city, i) => {
                return <CityCard key={i} city={city} selection={this.state.selection} handleDetails={(e) => this.handleDetails(e)} handleSelect={(e) => this.handleSelect(e) }/>
              })}
            </div>
              
            {(this.state.modal) ? <CityModal toggleModal={() => this.toggleModal()} info={this.state.modalInfo} /> : <></>}
            
          </div>
        </div>
    </>)
  }
}

export default Cities