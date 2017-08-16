import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from '../../../components/BusinessCard';
import ProjectCard from '../../../components/ProjectCard';
import CourseCard from '../../../components/CourseCard';
import './style.scss';

export default class LabPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, user } = this.props;
    console.log(data, user);
    return (
      <div className="lab-page">
        <div className="wrap">
          <div className="cover">
            <div className="cover-shade"/>
            <img alt="example" src={data.coverSrc} />
          </div>
          <div className="project-page-brief">
            <h1>移动互联网</h1>
            <h2>探索移动互联网的最新技术与最佳实践</h2>
            <h3>Created by Martin</h3>
          </div>
          <BusinessCard />
        </div>
        <div className="bottom-part">
          <div className="inner">
            <h1 className="project-part-title">项目展示</h1>
            <div className="bottom-part-container">
              {/*
                [1, 2, 3, 4, 5, 6, 7].map(k => (
                  <ProjectCard key={k} />
                ))
              */}
            </div>
            <h1 className="project-part-title">专业课程</h1>
            <div className="bottom-part-container">
              {/*
                [1, 2].map(k =>
                  <CourseCard key={k} />
                )
              */}
            </div>
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
