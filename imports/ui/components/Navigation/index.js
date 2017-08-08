import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './style.scss';


class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  userBlock(user) {
    return (
      <div>
        <Icon type="smile" />
      </div>
    )
  }

  render() {
    const { location, user } = this.props;

    return (
      <header className="navigation">
        <div className="logo"><span>MakerLab</span></div>
        <div className="nav-pull-right">
          <IndexLink to="/home" activeClassName="active" activeStyle={{ color: '#fff' }} >首页</IndexLink>
          <Link to="/lab" activeClassName="active" activeStyle={{ color: '#fff' }}>实验室</Link>
          <Link to="/course" activeClassName="active" activeStyle={{ color: '#fff' }}>课程</Link>
          <Link to="/project" activeClassName="active" activeStyle={{ color: '#fff' }}>项目</Link>
          {
            user ? this.userBlock(user) :
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
