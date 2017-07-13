import React from 'react'
import './style.scss'

const SkillField = () => (
  <div className="skill-field-item">
    <img src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" alt=""/>
    <p>HTML5</p>
  </div>
)

const BusinessCard = () => (
  <div className="business-card">
    <img className="user-avatar" src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" alt="" />
    <p className="user-name">Martin</p>
    <p className="user-feature">
      职位特色：移动互联网大赛金牌指导教师，ACM社团唯一指导教师
    </p>
    <p className="user-brief">
      我是个人介绍我是个人介绍我是个人介绍我是个人介绍我是个人介绍我是个人介绍我是个人介绍
      北大研究生
    </p>
    <div className="user-skill">
      <p>擅长领域</p>
      <div className="skill-field-group">
        <SkillField />
        <SkillField />
        <SkillField />
      </div>
    </div>
  </div>
)

export default BusinessCard
