import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import ProjectCard from '../../../components/ProjectCard';
import './style.scss';

export default class Project extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div className="project-page">
        <div className="project-carousel">
          <Carousel autoplay>
            <div>
            </div>
          </Carousel>
        </div>
        <div className="project-card-list">
          {
            projects && projects.map(project => <ProjectCard key={project._id} project={project} />)
          }
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  projects: PropTypes.array,
};
