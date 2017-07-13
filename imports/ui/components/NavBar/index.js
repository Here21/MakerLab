import React from 'react'
import { Link, IndexLink } from 'react-router'
import './style.scss'

const NavBar = ({ pathname }) => (
  <header id="header">
    <div className="inner">
      <Link to="/" className="logo">MakerLab</Link>
      <Link to="/login" className="login-panel">
        登录
      </Link>
      <nav id="nav">
        <IndexLink to="/" activeClassName="active" activeStyle={{ color: '#fff' }} >首页</IndexLink>
        <Link to="/lab" activeClassName="active" activeStyle={{ color: '#fff' }}>实验室</Link>
        <Link to="/course" activeClassName="active" activeStyle={{ color: '#fff' }}>课程</Link>
        <Link to="/project" activeClassName="active" activeStyle={{ color: '#fff' }}>项目</Link>
      </nav>
    </div>
  </header>
)

export default NavBar
