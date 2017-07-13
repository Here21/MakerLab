import React, { Component } from 'react'

import NavBar from '../../components/NavBar'
import FooterBar from '../../components/FooterBar'

import './style.scss'

export default class App extends Component {


  render() {
    const { location } = this.props
    console.log(location.pathname)
    return (
      <div className="container">
        <NavBar pathname={location.pathname} />
        { this.props.children }
        <FooterBar />
      </div>
    )
  }
}
