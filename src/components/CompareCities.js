import React from 'react'
import Axios from 'axios'

class CompareCities extends React.Component {

  constructor() {
    super()
    this.state = {
      data1: {
        scores: [],
        photos: {},
        details: {}
      },
      data2: {
        scores: [],
        photos: {},
        details: {}
      },
      errors: {}
    }
  }
  
  componentDidMount() {
    const city1 = this.props.match.params.id1
    const city2 = this.props.match.params.id2

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city1}/scores`)
      .then(resp => {
        const data1 = { ...this.state.data1 }
        data1.scores = resp.data
        this.setState({ data1 })
      })
      .catch(err => this.setState({ errors: err.response.status }))

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city2}/scores`)
      .then(resp => {
        const data2 = { ...this.state.data2 }
        data2.scores = resp.data
        this.setState({ data2 })
      })
      .catch(err => this.setState({ errors: err.response.status }))

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city1}/images`)
      .then(resp => {
        const data1 = { ...this.state.data1 }
        data1.photos = resp.data.photos[0].image
        this.setState({ data1 })
      })
      .catch(err => this.setState({ errors: err.response.status }))

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city2}/images`)
      .then(resp => {
        const data2 = { ...this.state.data2 }
        data2.photos = resp.data.photos[0].image
        this.setState({ data2 })
      })
      .catch(err => this.setState({ errors: err.response.status }))

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city1}/`)
      .then(resp => {
        const data1 = { ...this.state.data1 }
        data1.details = resp.data
        this.setState({ data1 })
      })
      .catch(err => this.setState({ errors: err.response.status }))

    Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city2}/`)
      .then(resp => {
        const data2 = { ...this.state.data2 }
        data2.details = resp.data
        this.setState({ data2 })
      })
      .catch(err => this.setState({ errors: err.response.status }))
  }


  render() {
    if (!this.state.data1.scores.categories || !this.state.data2.scores.categories) {
      return <h1>Loading...</h1>
    }
    return <section className="section">
      {console.log(this.state)}
      <div className="container">
        <div className="columns">
          
          <div className="column is-half">
            <div className="city-title" style={{
              backgroundImage: `url(${this.state.data1.photos.web})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="title is-size-4">
                {this.state.data1.details.full_name}
              </div>
            </div>
            {this.state.data1.scores.categories.map((category, i) => {
              return <div key={i} className="categories">
                <p className="is-size-6">
                  {category.name}: {Math.round(category.score_out_of_10 * 10)} / 100
                </p>
                <progress 
                  className={`progress ${(category.score_out_of_10 > this.state.data2.scores.categories[i].score_out_of_10) ? 'is-link' : 'is-warning'}`} 
                  value={category.score_out_of_10} 
                  max="10" 
                >
                </progress>
              </div>
            })}
          </div>

          <div className="column is-half">
            <div className="city-title" style={{
              backgroundImage: `url(${this.state.data2.photos.web})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="title is-size-4">
                {this.state.data2.details.full_name}
              </div>
            </div>
            {this.state.data2.scores.categories.map((category, i) => {
              return <div key={i} className="categories">
                <p className="is-size-6">
                  {category.name}: {Math.round(category.score_out_of_10 * 10)} / 100
                </p>
                <progress 
                  className={`progress ${(category.score_out_of_10 > this.state.data1.scores.categories[i].score_out_of_10) ? 'is-link' : 'is-warning'}`} 
                  value={category.score_out_of_10} 
                  max="10" 
                >
                </progress>
              </div>
            })}
          </div>

        </div>
      </div>
    </section>
  }
}

export default CompareCities