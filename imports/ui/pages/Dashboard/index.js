import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
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

  render() {
    return (
      <Layout className="dashboard">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <p>MakerLab</p>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/dashboard/me" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="user" />
                <span className="nav-text">个人中心</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/dashboard/lab" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="video-camera" />
                <span className="nav-text">实验室</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/dashboard/course" activeClassName="active" activeStyle={{ color: '#fff' }}>
                <Icon type="upload" />
                <span className="nav-text">课程</span>
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
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}


Dashboard.propTypes = {
  children: PropTypes.node,
  registration: PropTypes.func,
};
