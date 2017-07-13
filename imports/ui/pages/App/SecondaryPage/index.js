import React, { Component } from 'react'
import BusinessCard from '../../../components/BusinessCard'
import ProjectCard from '../../../components/ProjectCard'
import CourseCard from '../../../components/CourseCard'
import './style.css'

export default class SecondaryPage extends Component {
  render() {
    return (
      <div className="secondary-page">
        <div className="secondary-page-bg">
          <div className="secondary-page-brief">
            <h1>移动互联网</h1>
            <h2>探索移动互联网的最新技术与最佳实践</h2>
            <h3>Created by Martin</h3>
          </div>
          <img alt="example" width="100%" height="624px" src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" />
        </div>
        <BusinessCard />
        <div className="bottom-part">
          <div className="inner">
            <h1 className="project-part-title">项目展示</h1>
            <div className="bottom-part-container">
              {
                [1, 2, 3, 4, 5, 6, 7].map((k) => {
                  return (
                    <ProjectCard key={k} />
                  )
                })
              }
            </div>
            <h1 className="project-part-title">专业课程</h1>
            <div className="bottom-part-container">
              {
                [1, 2].map((k) => {
                  return (
                    <CourseCard key={k} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
