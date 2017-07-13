import React from 'react'
import { Card } from 'antd'
import './style.scss'

const UserAvatar = () => (
  <div className="user">
    <img className="avatar" src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" alt="avatar" />
    <p className="name">阿莱</p>
  </div>
)

const CourseCard = () => (
  <Card style={{ width: 592, height: 444, margin: '4px 4px' }} bodyStyle={{ padding: 0 }}>
    <div className="course-card-image">
      <img alt="example" width="100%" height="304px" src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" />
      <p className="course-title">艺术与设计</p>
    </div>
    <div className="course-card-content">
      <p className="declare">本课题由以下老师主讲</p>
      <div className="avatar-group">
        <UserAvatar />
        <UserAvatar />
        <UserAvatar />
      </div>
    </div>
  </Card>
)

export default CourseCard
