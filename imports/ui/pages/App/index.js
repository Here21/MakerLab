import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Navigation from '../../components/Navigation';
import FooterBar from '../../components/FooterBar';
import './style.scss';

const { Header, Content, Footer } = Layout;


class App extends Component {
  render() {
    const { location, user } = this.props;

    return (
    <Layout className="layout" style={{ backgroundImage: 'url("/images/subtle_white_feathers.png")' }}>
      <Header style={{ zIndex: 10, position: 'fixed', width: '100%' }}>
        <Navigation pathname={location.pathname} user={user} />
      </Header>
      <Content style={{ padding: '0 50px', fontSize: '16px' }}>
        <div style={{ width: '1200px', margin: '4rem auto' }}>
          { this.props.children }
        </div>
      </Content>
      <Footer style={{ backgroundColor: '#3F3F3F' }}>
        <FooterBar />
      </Footer>
    </Layout>
    );
  }
}


App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default App;
