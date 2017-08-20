import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Form, message, Input, Button, Select } from 'antd';
import QuillEditor from '../../../../ui/components/QuillEditor';
import UploadAndCut from '../../../../ui/components/UploadAndCut';
import UploadFileList from '../../../../ui/components/UploadFileList';

import Images from '../../../../../imports/api/documents/collections/images';
import Files from '../../../../../imports/api/documents/collections/files';

import './style.scss';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;

class CourseEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: null,
      coverInstance: null,
      fileList: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoverId = this.getCoverId.bind(this);
    this.handleStartUploadCover = this.handleStartUploadCover.bind(this);
    this.handleFileList = this.handleFileList.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { coverInstance, fileList } = this.state;
    // 开始上传
    const cover = await new Promise((resolve, reject) => {
      coverInstance.start();
      coverInstance.on('uploaded', (error, fileObj) => {
        if (!error) {
          message.success('封面上传成功！');
          return resolve(fileObj);
        }
        message.error('封面上传失败！');
        return reject(error);
      });
    });
    const coverSrc = Images.link(cover);
    const list = await this.fileListUpload(fileList);
    const files = list.map((file) => {
      return {
        fileId: file._id,
        fileLink: Files.link(file),
        fileName: file.name,
        type: file.type,
      };
    });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ownerId: Meteor.userId(),
          coverId: cover._id,
          coverSrc,
          courseName: values.courseName,
          department: values.department,
          courseType: values.courseType,
          content: values.content,
          files,
        };
        Meteor.call('Course.add', data, (error) => {
          if (error) {
            message.error('创建课程失败！');
          } else {
            message.success('创建课程成功！');
            browserHistory.push('/dashboard/course');
          }
        });
      }
    });
  }

  async fileListUpload(fileList) {
    try {
      if (!fileList || fileList.length < 1) {
        message.info('没有资料上传');
        return [];
      }
      const files = fileList.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploader = Files.insert({
            file,
            streams: 'dynamic',
            chunkSize: 'dynamic',
          }, false);
          uploader.start();
          uploader.on('uploaded', (error, fileObj) => {
            if (!error) {
              message.success(`材料[${fileObj.name}]上传成功！`);
              return resolve(fileObj);
            }
            message.error(`材料[${fileObj.name}]上传失败！`);
            return reject(error);
          });
        });
      });
      return Promise.all(files);
    } catch (e) {
      throw new Error(e.toString());
    }
  }

  getCoverId(cover) {
    this.setState({
      cover,
    });
  }

  handleStartUploadCover(coverInstance) {
    this.setState({
      coverInstance,
    });
  }

  async handleFileList(fileList) {
    this.setState({
      fileList,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="course-editor">
        <Form onSubmit={this.handleSubmit}>
          {/*<FormItem {...formItemLayout} label="创建人">*/}
            {/*<span className="ant-form-text">张灏哲</span>*/}
          {/*</FormItem>*/}
          <FormItem label="上传封面" {...formItemLayout}>
            <div className="uploader-wrapper">
              <UploadAndCut
                getCoverId={this.getCoverId}
                handleStartUploadCover={this.handleStartUploadCover}
              />
            </div>
          </FormItem>
          <FormItem label="课程名称" {...formItemLayout}>
            {getFieldDecorator('courseName', {
              rules: [
                {
                  type: 'string',
                  message: '请检查课程名格式是否为字符串!',
                },
                {
                  required: true,
                  message: '请填写课程名称!',
                },
              ],
            })(
              <Input
                style={{ width: 300 }}
                placeholder="2-12位字符"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="课程系别专业">
            {getFieldDecorator('department', {
              rules: [
                {
                  required: true,
                  message: '请选择课程所属专业!',
                },
              ],
            })(
              <Select
                style={{ width: 300 }}
                placeholder="请选择所属专业"
              >
                <OptGroup label="软件工程系">
                  <Option value="软件工程">软件工程</Option>
                </OptGroup>
                <OptGroup label="数字艺术系">
                  <Option value="数字媒体">数字媒体</Option>
                  <Option value="视觉传达">视觉传达</Option>
                </OptGroup>
                <OptGroup label="计算机系">
                  <Option value="计算机科学与技术">计算机科学与技术</Option>
                  <Option value="网络工程">网络工程</Option>
                </OptGroup>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="课程类型">
            {getFieldDecorator('courseType', {
              rules: [
                {
                  required: true,
                  message: '请选择课程类型!',
                },
              ],
            })(
              <Select
                style={{ width: 300 }}
                placeholder="请选择课程类型"
              >
                <Option value="创新创业教育">创新创业教育</Option>
                <Option value="项目实践">项目实践</Option>
                <Option value="理论体系">理论体系</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="课程内容" {...formItemLayout}>
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入课程内容!',
                },
              ],
            })(
              <QuillEditor />
            )}
          </FormItem>
          <FormItem label="课程附件" {...formItemLayout}>
            {getFieldDecorator('files')(
              <UploadFileList onChange={this.handleFileList} />
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

CourseEditor.propTypes = {
  children: PropTypes.node,
  registration: PropTypes.func,
  form: PropTypes.object,
};

const WrappedCourseEditor = Form.create()(CourseEditor);
export default WrappedCourseEditor;

