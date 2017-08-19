import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectCard from '../../../components/ProjectCard';
import './style.scss';

export default class Project extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div className="project-page">
        {
          projects && projects.map(project => <ProjectCard key={project._id} project={project} />)
        }
      </div>
    );
  }
}

Project.propTypes = {
  projects: PropTypes.array,
};
