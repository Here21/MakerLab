import React, { Component } from 'react'
import ProjectCard from '../../../components/ProjectCard'
import './style.scss'

export default class MyLab extends Component {
  render() {
    return (
      <div className="dashboard-mylab">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    )
  }
}
