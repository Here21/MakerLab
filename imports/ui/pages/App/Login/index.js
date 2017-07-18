import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Card } from 'antd';
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
        console.log(error)
        // TODO: 使用提示组件提示错误
        return;
      }
      // TODO: 使用提示组件提示登录成功，并设置setTimeOut
      browserHistory.push('/dashboard');
    });
  }

  onHandleRegistration(values) {
    const userInfo = {
      email: values.email,
      password: values.password,
      profile: {
        nickName: values.nickName,
        gender: values.gender,
      },
    };
    Accounts.createUser(userInfo, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      // TODO: 使用提示组件提示登录成功，并设置setTimeOut
      browserHistory.push('/dashboard');
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
