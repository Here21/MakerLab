import React, { Component } from 'react'
import LabCard from '../../../components/LabCard'
import './style.scss'

export default class Lab extends Component {
  render() {
    return (
      <div className="lab-page">
        <div className="inner">
          <LabCard />
          <LabCard />
          <LabCard />
          <LabCard />
          <LabCard />
          <LabCard />
          <LabCard />
          <LabCard />
        </div>
      </div>
    )
  }
}
