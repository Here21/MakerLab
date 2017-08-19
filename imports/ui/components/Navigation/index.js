import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import './style.scss';


class Navigation extends Component {
  render() {
    const { user } = this.props;
    return (
      <header className="navigation">
        <div className="logo"><span>MakerLab</span></div>
        <div className="nav-pull-right">
          <IndexLink to="/home" activeClassName="active" activeStyle={{ color: '#fff' }} >首页</IndexLink>
          <Link to="/lab" activeClassName="active" activeStyle={{ color: '#fff' }}>实验室</Link>
          <Link to="/course" activeClassName="active" activeStyle={{ color: '#fff' }}>课程</Link>
          <Link to="/project" activeClassName="active" activeStyle={{ color: '#fff' }}>项目</Link>
          {
            user ?
              <Link to="/dashboard" className="user-block">
                <div className="user-panel">
                  <Avatar src={user.profile.headImg} />
                  <span className="user-name">{user.profile.nickName}</span>
                </div>
              </Link> :
              <Link to="/login" className="login-panel">
                登录
              </Link>
          }
        </div>
        <div className="clearfix" />
      </header>
    );
  }
}


Navigation.propTypes = {
  location: PropTypes.object,
  user: PropTypes.any,
};

export default Navigation;
