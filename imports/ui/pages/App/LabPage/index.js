import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from '../../../components/BusinessCard';
import ProjectCard from '../../../components/ProjectCard';
import CourseCard from '../../../components/CourseCard';
import './style.scss';

class LabPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, user, courses } = this.props;
    console.log(data, user);
    return (
      <div className="lab-page">
        <div className="wrap">
          <div className="cover">
            <div className="cover-shade"/>
            <img alt="example" src={data.coverSrc} />
          </div>
          <div className="lab-page-brief">
            <h1>{data.labName}</h1>
            <h2>{data.researchDirection.join(',')}</h2>
            <h3>Created by {user.profile.nickName}</h3>
          </div>
          <BusinessCard profile={user.profile}/>
        </div>
        <div className="bottom-part">
          <h1 className="lab-part-title">项目展示</h1>
          <div className="bottom-part-container">
            {
              [1, 2, 3, 4, 5, 6, 7].map(k => (
                <ProjectCard key={k} />
              ))
            }
          </div>
          <h1 className="lab-part-title">专业课程</h1>
          <div className="bottom-part-container">
            {
              courses.map(course =>
                <CourseCard key={course._id} course={course} />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

LabPage.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

export default LabPage;
