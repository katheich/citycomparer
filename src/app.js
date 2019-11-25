import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import Logo from './images/city.png'

import Home from './components/Home'
import Cities from './components/Cities'
import Navbar from './components/Navbar'
import CompareCities from './components/CompareCities'

const App = () => (
  <BrowserRouter basename="/metropolists">
    <Navbar logo={Logo} />
    <Switch>
      <Route exact path="/" logo={Logo} component={Home} />
      <Route exact path="/cities" component={Cities} />
      <Route path="/:id1/:id2" component={CompareCities} />
    </Switch>
    
  </BrowserRouter>
)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)