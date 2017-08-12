import React from 'react';
import { Link } from 'react-router';
import './styles.scss';

const NotFound = () => (
  <div className="NotFound">
    <h1>404</h1>
    <h2>{ window.location.pathname }这个地址看起来并不存在啊？？？</h2>
    <Link to="/home">返回主页</Link>
    <div className="sheep">
      <img src="/Sheep.svg" alt=""/>
    </div>
  </div>
);

export default NotFound;
