import React, { Component } from 'react'
import CourseCard from '../../../components/CourseCard'
import './style.scss'

export default class Course extends Component {
  render() {
    return (
      <div className="course-page">
        <div className="inner">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    )
  }
}
