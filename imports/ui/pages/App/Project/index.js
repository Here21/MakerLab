import React, { Component } from 'react'
import ProjectCard from '../../../components/ProjectCard'
import './style.scss'

export default class Project extends Component {
  render() {
    return (
      <div className="project-page">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    )
  }
}
