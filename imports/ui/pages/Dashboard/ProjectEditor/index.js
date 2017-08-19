import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Form, message, Input, Button, Icon, Select } from 'antd';
import QuillEditor from '../../../../ui/components/QuillEditor';
import UploadAndCut from '../../../../ui/components/UploadAndCut';
import UploadFileList from '../../../../ui/components/UploadFileList';

import Images from '../../../../../imports/api/documents/collections/images';
import Files from '../../../../../imports/api/documents/collections/files';

import './style.scss';

const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const { TextArea } = Input;

class ProjectEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: null,
      coverInstance: null,
      fileList: null,
      brief: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoverId = this.getCoverId.bind(this);
    this.handleStartUploadCover = this.handleStartUploadCover.bind(this);
    this.handleFileList = this.handleFileList.bind(this);
    this.handleLimitBriefLength = this.handleLimitBriefLength.bind(this);
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
    const files = list.map(file => ({
      fileId: file._id,
      fileLink: Files.link(file),
      fileName: file.name,
      type: file.type,
    }));

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ownerId: Meteor.userId(),
          coverId: cover._id,
          coverSrc,
          projectName: values.projectName,
          projectSort: values.projectSort,
          projectType: values.projectType,
          projectBrief: values.projectBrief,
          content: values.content,
          files,
        };
        Meteor.call('Project.add', data, (error) => {
          if (error) {
            message.error('创建项目失败！');
            console.log(error);
          } else {
            message.success('创建项目成功！');
            browserHistory.push('/dashboard/project');
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
              message.success(`附件[${fileObj.name}]上传成功！`);
              return resolve(fileObj);
            }
            message.error(`附件[${fileObj.name}]上传失败！`);
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

  handleLimitBriefLength(value) {
    console.log(value);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="project-editor">
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
          <FormItem label="项目名称" {...formItemLayout}>
            {getFieldDecorator('projectName', {
              rules: [
                {
                  type: 'string',
                  message: '请检查项目名格式是否为字符串!',
                },
                {
                  required: true,
                  message: '请填写项目名称!',
                },
              ],
            })(
              <Input
                style={{ width: 300 }}
                placeholder="2-12位字符"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="项目类别">
            {getFieldDecorator('projectSort', {
              rules: [
                {
                  required: true,
                  message: '请选择项目所属类别!',
                },
              ],
            })(
              <Select
                style={{ width: 300 }}
                placeholder="请选择所属类别"
              >
                <Option value="竞赛项目">竞赛项目</Option>
                <Option value="创新创业">创新创业</Option>
                <Option value="课程项目">课程项目</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="行业分类">
            {getFieldDecorator('projectType', {
              rules: [
                {
                  required: true,
                  message: '请选择项目行业分类!',
                },
              ],
            })(
              <Select
                style={{ width: 300 }}
                placeholder="请选择项目行业分类"
              >
                <OptGroup label="互联网">
                  <Option value="电商">电商</Option>
                  <Option value="社交">社交</Option>
                  <Option value="旅游">旅游</Option>
                  <Option value="工具">工具</Option>
                  <Option value="共享经济">共享经济</Option>
                  <Option value="教育">教育</Option>
                </OptGroup>
                <OptGroup label="硬件">
                  <Option value="智能家居">智能家居</Option>
                  <Option value="机器人">机器人</Option>
                  <Option value="无人机">无人机</Option>
                </OptGroup>
                <OptGroup label="新兴技术">
                  <Option value="人工智能">人工智能</Option>
                  <Option value="虚拟现实">虚拟现实AR/VR</Option>
                  <Option value="区块链">区块链</Option>
                  <Option value="医疗健康">医疗健康</Option>
                </OptGroup>
                <OptGroup label="其他类型">
                  <Option value="经济">经济</Option>
                  <Option value="区块链">区块链</Option>
                  <Option value="体育">体育</Option>
                  <Option value="农业">农业</Option>
                  <Option value="物流">物流</Option>
                  <Option value="消费升级">消费升级</Option>
                </OptGroup>
              </Select>
            )}
          </FormItem>
          <FormItem label="一句话简述" {...formItemLayout}>
            {getFieldDecorator('projectBrief', {
              rules: [
                {
                  required: true,
                  message: '请填写项目简述!',
                },
              ],
            })(
              <TextArea
                maxLength="50"
                style={{ width: 300 }}
                placeholder="字数限制在50以内"
              />
            )}
          </FormItem>
          <FormItem label="项目内容" {...formItemLayout}>
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入项目内容!',
                },
              ],
            })(
              <QuillEditor />
            )}
          </FormItem>
          <FormItem label="项目附件" {...formItemLayout}>
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

ProjectEditor.propTypes = {
  children: PropTypes.node,
  registration: PropTypes.func,
  form: PropTypes.object,
};

const WrappedProjectEditor = Form.create()(ProjectEditor);
export default WrappedProjectEditor;

