import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Form, message, Input, Button, Icon, Select } from 'antd';
import QuillEditor from '../../../../ui/components/QuillEditor';
import UploadAndCut from '../../../../ui/components/UploadAndCut';
import Images from '../../../../../imports/api/documents/collections/images';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;

class LabEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: null,
      coverInstance: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoverId = this.getCoverId.bind(this);
    this.handleStartUploadCover = this.handleStartUploadCover.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.state.coverInstance.start();

    const cover = await new Promise((resolve, reject) => {
      this.state.coverInstance.on('uploaded', (error, fileObj) => {
        if (!error) {
          message.success('封面上传成功！');
          return resolve(fileObj);
        }
        message.error('封面上传失败！');
        return reject(error);
      });
    });
    const coverSrc = Images.link(cover);

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values', values);
        const data = {
          ownerId: Meteor.userId(),
          coverId: cover._id,
          coverSrc,
          labName: values.labName,
          researchDirection: values.researchDirection,
          description: values.description,
        };
        Meteor.call('Labs.add', data, (error) => {
          if (error) {
            message.error('创建实验室失败！');
          } else {
            message.success('创建实验室成功！');
            browserHistory.push('/dashboard/lab');
          }
        });
      }
    });
  }

  getCoverId(cover) {
    console.log(cover);
    this.setState({
      cover,
    });
  }

  handleStartUploadCover(coverInstance) {
    this.setState({
      coverInstance,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="创建人">
            <span className="ant-form-text">张灏哲</span>
          </FormItem>
          <FormItem label="上传封面" {...formItemLayout}>
            <div className="uploader-wrapper">
              <UploadAndCut
                getCoverId={this.getCoverId}
                handleStartUploadCover={this.handleStartUploadCover}
              />
            </div>
          </FormItem>
          <FormItem label="实验室名称" {...formItemLayout}>
            {getFieldDecorator('labName', {
              rules: [
                {
                  type: 'string',
                  message: 'The input is not valid string!',
                },
                {
                  required: true,
                  message: 'Please input your Lab Name!',
                },
              ],
            })(
              <Input
                style={{ width: 300 }}
                placeholder="2-12位字符"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="实验室研究方向">
            {getFieldDecorator('researchDirection', {
              rules: [
                {
                  required: true,
                  message: 'Please select your favourite colors!',
                  type: 'array',
                },
              ],
            })(
              <Select
                style={{ width: 300 }}
                mode="multiple"
                placeholder="请选择一个相关方向"
              >
                <Option value="移动互联网">移动互联网</Option>
                <Option value="物联网">物联网</Option>
                <Option value="在线教育">在线教育</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="实验室描述"
            {...formItemLayout}
          >
            {getFieldDecorator('description', {
              rules: [{ message: '请输入描述内容' }],
            })(
              <QuillEditor />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 4 }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LabEditor.propTypes = {
  children: PropTypes.node,
  registration: PropTypes.func,
  form: PropTypes.object,
};

const WrappedLabEditor = Form.create()(LabEditor);
export default WrappedLabEditor;

