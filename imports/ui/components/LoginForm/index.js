import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.scss';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    // this.state = {
    //
    // }
    // this.handleTurnRegistration = this.handleTurnRegistration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login(values);
      }
    });
  }

  // handleTurnRegistration() {
  //   this.props.turnRegistration();
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
          label="邮箱"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '输入的电子邮箱无效!',
            }, {
              required: true, message: '请输入用户名!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="邮箱" />
          )}
        </FormItem>
        <FormItem
          label="密码"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a onClick={() => this.props.turnRegistration('registration')}>注册新用户!</a>
        </FormItem>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  turnRegistration: PropTypes.func,
  login: PropTypes.func,
  form: PropTypes.object,
};

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
