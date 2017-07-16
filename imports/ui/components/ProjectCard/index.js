import React from 'react';
import { Card } from 'antd';
import './style.scss';

const ProjectCard = ({ user }) => (
  <Card style={{ width: 292, height: 340, margin: '4px 4px' }} bodyStyle={{ padding: 0 }}>
    <div className="project-card-image">
      <img alt="example" src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" />
      <p className="project-label">竞赛项目</p>
    </div>
    <div className="project-card-content">
      <h1>Lab名称</h1>
      <p className="project-introduce">
        个人描述个人描述个人描述个人描述个人描述个人描述个人描述个人描述
        个人描述个人描述个人描述个人描述个人描述个人描述个人描述个人描述
        个人描述个人描述个人描述个人描述个人描述个人描述个人描述个人描述
        个人描述个人描述个人描述个人描述个人描述个人描述个人描述个人描述个人描述个人描述
      </p>
      <div className="project-status-info">
        <p className="project-author">MakerLab团队</p>
        <p className="project-viewer">1271</p>
      </div>
    </div>
  </Card>
)


export default ProjectCard;
