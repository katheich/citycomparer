import React from 'react'

import Axios from 'axios'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '','')
}

class CityModal extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    const slug = this.props.info[0]

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${slug}/details`)
      .then(resp => this.setState({ data: resp.data }, console.log(this.state.data)))
      .catch(err => this.setState({ errors: err.response.status }))
  }

  render() {
    if (!this.state.data.categories) {
      return <></>
    }
    return (<><h1>{console.log(this.state.data)}</h1>

      
          
      <div className="modal is-active">
        <div className="modal-background" onClick={() => this.props.toggleModal()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.info[1]}</p>
            <button className="delete" aria-label="close" onClick={() => this.props.toggleModal()}></button>
          </header>
          <section className="modal-card-body">
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
          </section>
          <footer className="modal-card-foot"></footer>
        </div>
      </div>
      </>)
  }
}

export default CityModal