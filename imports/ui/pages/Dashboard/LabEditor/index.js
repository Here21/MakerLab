import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Form, message, Input, Button, Upload, Icon, Select } from 'antd';
import QuillEditor from '../../../../ui/components/QuillEditor';
// import RichEditor from '../../../../ui/components/RichEditor';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class LabEditor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const data = {
          labName: values.labName,
          researchDirection: values.researchDirection,
          description: values.description,
        };
        Meteor.call('Labs.add', data, err => {
          if (err) {
            console.log(err);
            message.error('创建实验室失败！');
          } else {
            message.success('创建实验室成功！');
            browserHistory.push('/dashboard/lab');
          }
        });
      }
    });
  }

  normFile(e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleChange(info) {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({ imageUrl })
      );
    }
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
              <Dragger
                className="avatar-uploader"
                name="avatar"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽上传背景</p>
              </Dragger>
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
            })(<Input placeholder="2-12位字符" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="实验室研究方向">
            {getFieldDecorator('researchDirection', {
              rules: [
                {
                  required: true,
                  message: 'Please select your favourite colors!',
                  type: 'array'
                }
              ]
            })(
              <Select mode="multiple" placeholder="请选择一个相关方向">
                <Option value="移动互联网">移动互联网</Option>
                <Option value="物联网">物联网</Option>
                <Option value="在线教育">在线教育</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="实验室描述" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [{ message: '请输入描述内容' }],
            })(
              <QuillEditor />
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLabEditor = Form.create()(LabEditor);
export default WrappedLabEditor;

LabEditor.propTypes = {
  children: PropTypes.node,
  registration: PropTypes.func,
  form: PropTypes.object,
};
