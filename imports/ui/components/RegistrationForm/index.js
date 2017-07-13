import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Radio } from 'antd'
import './style.scss'

const FormItem = Form.Item
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group


class RegistrationForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      confirmDirty: false,
      gender: 'Male'
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.registration(values)
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '输入的电子邮箱无效!',
            }, {
              required: true, message: '请输入您的电子邮箱！',
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
              required: true, message: '请输入密码!'
            }]
          })(
            <RadioGroup>
              <RadioButton value="Male">男</RadioButton>
              <RadioButton value="Unknown">不确定？</RadioButton>
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
              required: true, message: '请输入密码!',
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
              required: true, message: '请确认您的密码!',
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
              Nickname
              <Tooltip title="你希望别人怎么称呼您?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入您的名字!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
    )
  }
}

RegistrationForm.contextTypes = {
  turnLogin: React.PropTypes.string,
  registration: React.PropTypes.func
}

const WrappedRegistrationForm = Form.create()(RegistrationForm)
export default WrappedRegistrationForm
