import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from '../../../components/BusinessCard';
import './style.scss';

class LabPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.courseName);
  }
  // TODO: 绑定数据
  render() {
    const { data, user } = this.props;
    return (
      <div className="course-page">
        <div className="wrap">
          <div className="cover">
            <div className="cover-shade"/>
            <img alt="example" src={data.coverSrc} />
          </div>
          <div className="course-page-brief">
            <h1>{data.courseName}</h1>
            <h2>{data.researchDirection.join(',')}</h2>
            <h3>Created by {user.profile.nickName}</h3>
          </div>
          <BusinessCard profile={user.profile}/>
        </div>
        <div className="bottom-part">
          {/*<div dangerouslySetInnerHTML={data.content}></div>*/}
        </div>
      </div>
    );
  }
}

LabPage.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

export default LabPage;
