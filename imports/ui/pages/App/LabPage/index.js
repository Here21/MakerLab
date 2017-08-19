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
    const { data, user, courses, projects } = this.props;
    console.log(data);
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
          <h1 className="title">实验室介绍</h1>
          <div className="article">
            <div className="content" dangerouslySetInnerHTML={{ __html: data.description }}>
            </div>
          </div>
          <h1 className="lab-part-title">项目展示</h1>
          <div className="bottom-part-container">
            {
              projects.map(project => (
                <ProjectCard key={project._id} project={project} />
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
  courses: PropTypes.array,
  projects: PropTypes.array,
};

export default LabPage;
