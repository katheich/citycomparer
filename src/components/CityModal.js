import React from 'react'

import Axios from 'axios'
import ReactMapGL, { Marker } from 'react-map-gl'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

class CityModal extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {},
      viewport: {
        width: '100%',
        height: '100%',
        latitude: null,
        longitude: null,
        zoom: 5
      },
      latitude: null,
      longiutde: null
    }
  }

  componentDidMount() {
    const slug = this.props.info[0]

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${slug}/details`)
      .then(resp => this.setState({ data: resp.data }, console.log(this.state.data)))
      .catch(err => this.setState({ errors: err.response.status }))

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${slug}/`)
      .then(resp => {
        const { east, north, south, west } = resp.data.bounding_box.latlon
        const lat = (north + south) / 2
        const lon = (east + west) / 2

        const viewport = { ... this.state.viewport }
        viewport.latitude = lat
        viewport.longitude = lon

        this.setState({ viewport, latitude: lat, longitude: lon })

      })
      .catch(err => this.setState({ errors: err.response.status }))
  }

  render() {
    if (!this.state.data.categories || !this.state.viewport.latitude) {
      return <div className="modal is-active">
        <div className="modal-background" onClick={() => this.props.toggleModal()}></div>
      </div>
    }
    return (<>
      <div className="modal is-active">
        <div className="modal-background" onClick={() => this.props.toggleModal()}></div>
        <div className="modal-card">

          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.info[1]}</p>
            <button className="delete" aria-label="close" onClick={() => this.props.toggleModal()}></button>
          </header>

          <section className="modal-card-body">
            <div className="columns">
              <div className="column is-half">
                <p>Urban area population: {numberWithCommas(Math.round(this.state.data.categories.find(({ id }) => id === 'CITY-SIZE').data[0].float_value * 1000000))} </p>
                <br />
                <p>Currency: {this.state.data.categories.find(({ id }) => id === 'ECONOMY').data[0].string_value} </p>
                <p>Currency exchange rate to USD: {this.state.data.categories.find(({ id }) => id === 'ECONOMY').data[1].float_value.toFixed(2)} </p>
                <br />
                <p>GDP per capita: ${numberWithCommas(Math.round(this.state.data.categories.find(({ id }) => id === 'ECONOMY').data[4].currency_dollar_value))} </p>
                <br />
                <p>Life expectancy: {Math.round(this.state.data.categories.find(({ id }) => id === 'HEALTHCARE').data[1].float_value)} </p>
                <br />
                <p>LGBT marriage: {this.state.data.categories.find(({ id }) => id === 'MINORITIES').data[9].string_value} </p>
              </div>

              <div className="column is-half">
                {/* {console.log('AUTH', process.env.AUTH)} */}
                <ReactMapGL
                  {...this.state.viewport}
                  onViewportChange={(viewport) => this.setState({ viewport })}
                  mapboxApiAccessToken={process.env.AUTH}
                  mapStyle='mapbox://styles/mapbox/light-v9'
                >
                  <Marker latitude={this.state.latitude} longitude={this.state.longitude} offsetTop={-10} captureDrag={true}>
                    <i className="fas fa-map-marker-alt"></i>
                  </Marker>
                </ReactMapGL>
              </div>
            </div>


          </section>

          <footer className="modal-card-foot"></footer>
        </div>
      </div>
      </>)
  }
}

export default CityModal