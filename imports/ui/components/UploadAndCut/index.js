import React, { Component } from 'react';
import Meteor from 'meteor/meteor';
import { Upload, Icon, message, Button } from 'antd';
import Images from '../../../../imports/api/documents/collections/files';

const Dragger = Upload.Dragger;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener('load', () => callback(reader.result));
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


class UploadAndCut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      uploadIng: false,
      localLoad: false,
      file: null,
      progress: null,
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.uploadIt = this.uploadIt.bind(this);
  }


  handleUpload(localFile) {
    console.log(localFile);
    getBase64(localFile.file.originFileObj, (imageUrl) => {
      const test = [
        'data:image/jpeg',
        'data:image/png;',
        'data:image/jpg;',
      ];
      if (!test.includes(imageUrl.slice(0, 15))) {
        return message.error('必须上传jpeg格式的图片');
      }
      this.setState({
        src: imageUrl,
        localLoad: false,
      });
      return false;
    });
  }

  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    console.log(file);
    // return isJPG && isLt2M;
    this.setState({
      file,
    });
    return false;
  }

  uploadIt() {
    const self = this;

    if (this.state.file) {
      const uploadInstance = Images.insert({
        file: this.state.file,
        meta: {
          locator: self.props.fileLocator,
          userId: Meteor.userId(), // Optional, used to check on server for file tampering
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        allowWebWorkers: true // If you see issues with uploads, change this to false
      }, false);

      self.setState({
        uploading: uploadInstance, // Keep track of this instance to use below
        inProgress: true // Show the progress bar now
      });

      // These are the event functions, don't need most of them, it shows where we are in the process
      uploadInstance.on('start', () => {
        console.log('Starting');
      });

      uploadInstance.on('end', (error, fileObj) => {
        console.log('On end File Object: ', fileObj);
      });

      uploadInstance.on('uploaded', (error, fileObj) => {
        console.log('uploaded: ', fileObj);

        // Remove the filename from the upload box
        // self.refs['fileinput'].value = '';

        // Reset our state for the next file
        // self.setState({
        //   uploading: [],
        //   progress: 0,
        //   inProgress: false
        // });
      });

      uploadInstance.on('error', (error, fileObj) => {
        console.log('Error during upload: ' + error);
      });

      uploadInstance.on('progress', (progress, fileObj) => {
        console.log('Upload Percentage: ' + progress);
        // Update our progress bar
        self.setState({
          progress: progress
        })
      });

      uploadInstance.start(); // Must manually start the upload
    }
  }

  render() {
    console.log(this.state.progress);
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        <Dragger
          name='file'
          multiple={false}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
          onChange={this.handleUpload}
        >
          <p className='ant-upload-drag-icon'>
            <Icon type='inbox' />
          </p>
          <h5 className='ant-upload-text'>
            <span style={{ fontSize: 'larger' }}>封面图</span>
            点击或拖拽图片到此进行截图
          </h5>
          <p className='ant-upload-hint'>建议图片比例16：9 - 大小小于2M - JPG格式</p>
        </Dragger>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.uploadIt}
        >
          上传
        </Button>
      </div>
    );
  }
}

export default UploadAndCut;
