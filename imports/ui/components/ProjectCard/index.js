import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
import './style.scss';

const ProjectCard = ({ project }) => (
  <Card style={{ width: 292, height: 340, margin: '4px 4px' }} bodyStyle={{ padding: 0 }}>
    <Link to={`/project/${project._id}`}>
      <div className="project-card-image">
        <img alt="example" src={project.coverSrc} />
        <p className="project-label">{project.projectType}</p>
      </div>
    </Link>
    <div className="project-card-content">
      <h1>{project.projectName}</h1>
      <p className="project-introduce">
        {project.projectBrief}
      </p>
      <div className="project-status-info">
        <p className="project-author">{project.projectSort}</p>
        <p className="project-viewer">{moment(project.createdAt).format('YYYY-MM')}</p>
      </div>
    </div>
  </Card>
);

ProjectCard.propTypes = {
  project: PropTypes.object,
};

export default ProjectCard;
