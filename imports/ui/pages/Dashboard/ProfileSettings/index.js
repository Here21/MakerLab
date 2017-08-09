import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tooltip, Icon, Button, Radio } from 'antd';
import './style.scss';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;


class ProfileSettings extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    console.log(user);
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
      <div className="dashboard-me">
        <Form onSubmit={this.handleSubmit} className="registration-form">
          <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            <span>{user.emails[0].address}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="性别"
          >
            <span>{user.profile.gender}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="昵称"
          >
           <span>{user.profile.nickName}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="个人介绍"
          >
            <TextArea
              placeholder="请介绍一下自己"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="个人能力"
          >
            <TextArea
              placeholder="描述一下自己的能力方向，或者工作或学习经历"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="registration-button"
            >
              更新
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  turnLogin: PropTypes.func,
  registration: PropTypes.func,
  form: PropTypes.object,
};

const WrappedProfileSettingsForm = Form.create()(ProfileSettings);
export default WrappedProfileSettingsForm;
