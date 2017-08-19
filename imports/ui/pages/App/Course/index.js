import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CourseCard from '../../../components/CourseCard';
import './style.scss';

export default class Course extends Component {
  render() {
    const { courses } = this.props;
    return (
      <div className="course-page">
        {
          courses &&
          courses.map(course => <CourseCard key={course._id} course={course}/>)
        }
      </div>
    );
  }
}

Course.propTypes = {
  courses: PropTypes.array,
};
