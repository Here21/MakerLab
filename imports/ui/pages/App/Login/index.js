import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Card, message } from 'antd';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import LoginForm from '../../../components/LoginForm';
import Registration from '../../../components/RegistrationForm';

import './style.scss';

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loginState: 'login',
    };
    this.onHandleTransition = this.onHandleTransition.bind(this);
  }

  onHandleLogin(value) {
    Meteor.loginWithPassword(value.email, value.password, (error) => {
      if (error) {
        console.log(error);
        message.error(`登录失败, 出错原因：${error.reason}`);
        return;
      }
      // TODO: 使用提示组件提示登录成功，并设置setTimeOut
      message.success('登录成功');
      browserHistory.push('/dashboard');
    });
  }

  onHandleRegistration(values) {
    const userInfo = {
      email: values.email,
      password: values.password,
      profile: {
        nickName: values.nickname,
        gender: values.gender,
      },
    };
    Accounts.createUser(userInfo, (error) => {
      if (error) {
        console.log(error);
        message.error(`注册失败 原因：${error.reason}`);
        return;
      }

      message.success('恭喜您注册成功，三秒钟后跳转到控制面板');
      setTimeout(() => {
        browserHistory.push('/dashboard');
      }, 3000);
    });
  }

  onHandleTransition(path) {
    this.setState({
      loginState: path,
    });
  }

  render() {
    return (
      <div className="login-page">
        <div className="inner">
          <Card bordered={false} className="login-page-card">
            {
              this.state.loginState === 'login' ?
                <LoginForm
                  turnRegistration={this.onHandleTransition}
                  login={this.onHandleLogin}
                />
                :
                <Registration
                  turnLogin={this.onHandleTransition}
                  registration={this.onHandleRegistration}
                />
            }
          </Card>
        </div>
      </div>
    );
  }
}


Login.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};
