import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import CourseCard from '../../../components/CourseCard';
import './style.scss';

export default class Course extends Component {
  render() {
    const { courses } = this.props;
    return (
      <div className="course-page">
        <div className="course-carousel">
          <Carousel autoplay>
            <div>
            </div>
          </Carousel>
        </div>
        <div className="course-card-list">
          {
            courses &&
            courses.map(course => <CourseCard key={course._id} course={course}/>)
          }
        </div>
      </div>
    );
  }
}

Course.propTypes = {
  courses: PropTypes.array,
};
