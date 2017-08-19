import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card } from 'antd';
import './style.scss';

const UserAvatar = () => (
  <div className="user">
    <img className="avatar" src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" alt="avatar" />
    <p className="name">阿莱</p>
  </div>
);

const CourseCard = ({ course }) => (
  <Card style={{ width: 592, height: 444, margin: '4px 4px' }} bodyStyle={{ padding: 0 }}>
    <Link to={`/course/${course._id}`}>
      <div className="course-card-image">
        <img className="cover" alt="example" src={course.coverSrc} />
        <p className="course-title">{course.courseName}</p>
      </div>
    </Link>
    <div className="course-card-content">
      <p className="declare">本课题由以下老师主讲</p>
      <div className="avatar-group">
        <div className="user">
          <img className="avatar" src={course.user.profile.headImg} alt="avatar" />
          <p className="name">{course.user.profile.nickName}</p>
        </div>
      </div>
    </div>
  </Card>
);

CourseCard.propTypes = {
  course: PropTypes.object,
};


export default CourseCard;
