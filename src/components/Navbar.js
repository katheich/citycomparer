import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../images/city.png'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return <div className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={Logo} height="28" />
            Metropolists
          </Link>
          <a
            role="button"
            className={`navbar-burger burger ${this.state.isOpen ? 'is-active' : ''}`}
            onClick={() => this.toggleNavbar()}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <div className="navbar-item">
              <Link className="navbar-item" to="/cities">Explore cities</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

export default withRouter(Navbar)