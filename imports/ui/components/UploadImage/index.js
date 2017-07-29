import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import PropTypes from 'prop-types';

const Dragger = Upload.Dragger;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener('load', () => callback(reader.result));
}

function checkImage(file) {
  console.log(file.type);
  // 条件
  const isLt2M = file.size / 1024 / 1024 < 2;
  const test = [
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];

  // 检查
  if (!isLt2M) {
    message.error('上传图片不得超过2MB');
    return false;
  } else if (!test.includes(file.type)) {
    message.error('必须上传jpeg/jpg/png格式的图片');
    return false;
  }
  return true;
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
  }

  handleUpload(localFile) {
    console.log(localFile);
    getBase64(localFile.file.originFileObj, (imageUrl) => {
      this.props.changeImageSrc(imageUrl);
      return false;
    });
  }

  beforeUpload(file) {
    if (!checkImage(file)) return;
    getBase64(file, (imageUrl) => {
      this.props.changeImageSrc(imageUrl);
    });
  }

  render() {
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        <Dragger
          name='file'
          multiple={false}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
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
      </div>
    );
  }
}


UploadAndCut.propTypes = {
  imageSrc: PropTypes.string,
  changeImageSrc: PropTypes.func,
};


export default UploadAndCut;
