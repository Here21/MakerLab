import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Tag } from 'antd';
import moment from 'moment';
import './style.scss';

// TODO: 实验室点赞数，项目数量，课程数量等信息

const LabCard = ({ lab }) => (
  <Card className="lab-card" style={{ width: 392, height: 420, margin: '4px 4px' }} bodyStyle={{ padding: 0 }}>
    <Link to={`/lab/${lab._id}`}>
      <div className="lab-card-image">
        <img alt="lab cover image" src={lab.coverSrc} />
      </div>
    </Link>
    <div className="lab-card-content">
      <h1>{lab.labName}</h1>
      <div className="lab-introduce">
        {lab.researchDirection.map((item, index) => <Tag key={index} color="#2db7f5">{item}</Tag>)}
      </div>
      {
        lab.user &&
        <div className="lab-master-info">
          <div className="master-avatar">
            <img className="avatar" src={lab.user.profile.headImg} alt="avatar" />
            <p className="username">{lab.user.profile.nickName}</p>
          </div>
          <p className="user-feature">{lab.user.profile.bio}</p>
        </div>
      }
      <div className="lab-state">创建于：{moment(lab.createdAt).format('YYYY-MM-DD')}</div>
    </div>
  </Card>
);

LabCard.propTypes = {
  lab: PropTypes.object,
};

export default LabCard;
