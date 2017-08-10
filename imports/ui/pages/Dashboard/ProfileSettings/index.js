import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, message } from 'antd';
import './style.scss';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option, OptGroup } = Select;


class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: this.props.user.profile.bio || '',
      organization: this.props.user.profile.organization || '',
      skills: this.props.user.profile.skills || '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // Meteor.user
        Meteor.call('user.update', Meteor.userId(), values, (err) => {
          if (err) {
            message.error(err.reason);
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
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
            {getFieldDecorator('bio', {
              initialValue: this.state.bio,
            })(
              <TextArea
                placeholder="请介绍一下自己"
                autosize={{ minRows: 2, maxRows: 4 }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="个人能力"
          >
            {getFieldDecorator('skills', {
              initialValue: this.state.skills,
            })(
              <Select
                style={{ width: 200 }}
              >
                <OptGroup label="编程">
                  <Option value="移动开发">移动开发</Option>
                  <Option value="web开发">web开发</Option>
                  <Option value="Linux运维">Linux运维</Option>
                  <Option value="游戏">游戏</Option>
                  <Option value="其他">其他</Option>
                </OptGroup>
                <OptGroup label="设计">
                  <Option value="交互设计">交互设计</Option>
                  <Option value="平面设计">平面设计</Option>
                  <Option value="UI设计">UI设计</Option>
                </OptGroup>
                <OptGroup label="创意">
                  <Option value="头脑风暴">头脑风暴</Option>
                </OptGroup>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所属系别"
          >
            {getFieldDecorator('organization', {
              initialValue: this.state.organization,
            })(
              <Select
                style={{ width: 200 }}
              >
                <OptGroup label="软件工程系">
                  <Option value="软件工程">软件工程</Option>
                </OptGroup>
                <OptGroup label="计算机系">
                  <Option value="交互设计">计算机网络</Option>
                  <Option value="平面设计">计算机科学与技术</Option>
                </OptGroup>
                <OptGroup label="艺术系">
                  <Option value="视觉传达">视觉传达</Option>
                </OptGroup>
              </Select>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="registration-button"
            >
              完善个人资料
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
  user: PropTypes.object,
};

const WrappedProfileSettingsForm = Form.create()(ProfileSettings);
export default WrappedProfileSettingsForm;
