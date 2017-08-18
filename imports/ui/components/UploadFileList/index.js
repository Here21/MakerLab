import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, Icon, message } from 'antd';

class UploadFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload() {
    // TODO: 对每个上传的文件的大小在前端做一下判定
    const { fileList } = this.state;

    this.setState({
      uploading: true,
    });
    const { onChange } = this.props;
    onChange(fileList);
  }

  render() {
    const { uploading } = this.state;
    const uploadProps = {
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div>
        <Upload {...uploadProps}>
          <p>单个文件限制大小不超过30MB</p>
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
        >
          确定
        </Button>
      </div>
    );
  }
}

UploadFileList.propsType = {
  onChange: PropTypes.func,
};

export default UploadFileList;
