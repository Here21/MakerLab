import React, { Component } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import Files from '../../../../imports/api/documents/collections/files';


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
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
    console.log("fileList state : ", fileList);
    const fileInstance = Files.insert({
      file: fileList[0],
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);
    fileInstance.on('error', (error, fileObj) => {
      message.error('上传失败！');
      self.setState({
        imageSrc: null,
      });
    });
    fileInstance.on('uploaded', (error, fileObj) => {
      if (error) {
        console.log('files error', error);
        return;
      }
      console.log(fileObj);
    });

    fileInstance.start();
  }

  render() {
    const { uploading } = this.state;
    const props = {
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
        console.log(file);
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      </div>
    );
  }
}

export default UploadFileList;
