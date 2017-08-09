import React from 'react';
import { Form, Input, Tooltip, Icon, Button, Radio } from 'antd';
import PropTypes from 'prop-types';

import './style.scss';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class RegistrationForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      confirmDirty: false,
      gender: 'Male',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.registration(values);
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //
    // const formItemLayout = {
    //   labelCol: { span: 6 },
    //   wrapperCol: { span: 14 },
    // };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     span: 14,
    //     offset: 6,
    //   },
    // };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="registration-form">
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '不是有效的邮箱格式!',
            }, {
              required: true, message: '请输入您的邮箱！',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
          hasFeedback
        >
          {getFieldDecorator('gender', {
            rules: [{
              required: true, message: '请选择您的性别',
            }],
          })(
            <RadioGroup>
              <RadioButton value="Male">男</RadioButton>
              <RadioButton value="Female">女</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码！',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码！',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="告诉其他人您的昵称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="registration-button"
          >
            注册
          </Button>
          已有账号，<a onClick={() => this.props.turnLogin('login')}>已有账号，去登陆!</a>
        </FormItem>
      </Form>
    );
  }
}

RegistrationForm.propTypes = {
  turnLogin: PropTypes.func,
  registration: PropTypes.func,
  form: PropTypes.object,
};

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;
