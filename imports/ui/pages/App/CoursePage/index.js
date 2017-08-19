import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusinessCard from '../../../components/BusinessCard';
import './style.scss';

class CoursePage extends Component {
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
            <h2>{data.courseType}</h2>
            <h3>Created by {user.nickName}</h3>
          </div>
          <BusinessCard profile={user}/>
        </div>
        <div className="bottom-part">
          <h1>课程内容</h1>
          <div className="article">
            <div className="content" dangerouslySetInnerHTML={{ __html: data.content }}>
            </div>
          </div>
          <h1>相关附件</h1>
          <div className="file-list">
            {
              data.files ? data.files.map((file) => {
                return (
                  <p key={file.fileId} className="file-link">
                    {file.fileName}
                    <a href={file.fileLink} download={file.fileName}>下载</a>
                  </p>
                );
              }) : <p style={{ textAlign: 'center' }}>无附件</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

CoursePage.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

export default CoursePage;
