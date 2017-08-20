import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import './style.scss';

const { Header, Sider, Content } = Layout;


export default class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loginState: 'login',
      collapse: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    if (!Meteor.userId()) {
      message.info('请先登录');
      browserHistory.replace('/login');
    }
  }

  render() {
    const { location } = this.props;
    return (
      <Layout className="dashboard">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <Link to="/home">
              <p>MakerLab</p>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${location.pathname}`]}>
            <Menu.Item key="/dashboard/me">
              <Link to="/dashboard/me" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="user" />
                <span className="nav-text">个人中心</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/lab">
              <Link to="/dashboard/lab" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="appstore-o" />
                <span className="nav-text">实验室</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/course">
              <Link to="/dashboard/course" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="book" />
                <span className="nav-text">课程</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/project">
              <Link to="/dashboard/project" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="rocket" />
                <span className="nav-text">项目</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Button
              className="user-logout"
              type="primary"
              icon="logout"
              onClick={() => {
                Meteor.logout();
                browserHistory.replace('/login');
              }}
            >
              注销登录
            </Button>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', overflowY: 'auto' }}>
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}


Dashboard.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};
