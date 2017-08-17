import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const SkillField = () => (
  <div className="skill-field-item">
    <img src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png" alt=""/>
    <p>HTML5</p>
  </div>
)

const BusinessCard = ({ profile }) => {
  console.log(profile);
  return (
    <div className="business-card">
      <img
        className="user-avatar"
        src={profile.headImg}
        alt="avatar"
      />
      <p className="user-name">{profile.nickName}</p>
      <div className="user-brief">
        <p className="user-feature">
          个人简介
        </p>
        <div>{profile.bio}</div>
      </div>
      <div className="user-skill">
        <p>擅长领域</p>
        <div className="skill-field-group">
          <SkillField/>
          <SkillField/>
          <SkillField/>
        </div>
      </div>
    </div>
  );
};

BusinessCard.propTypes = {
  profile: PropTypes.object,
};

export default BusinessCard;
