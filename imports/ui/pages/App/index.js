import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Navigation from '../../components/Navigation';
import FooterBar from '../../components/FooterBar';
import './style.scss';

const { Header, Content, Footer } = Layout;


class App extends Component {
  render() {
    const { location } = this.props;

    return (
    <Layout className="layout" style={{ backgroundImage: 'url("/images/subtle_white_feathers.png")' }}>
      <Header>
        <Navigation pathname={location.pathname} />
      </Header>
      <Content>
        <div style={{ width: '1200px', margin: '3rem auto' }}>
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
  location: PropTypes.string,
};

export default App;
