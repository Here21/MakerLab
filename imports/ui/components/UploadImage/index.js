import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';

const Dragger = Upload.Dragger;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.readAsDataURL(img);
//   reader.addEventListener('load', () => callback(reader.result));
// }

function checkImage(file) {
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
    this.beforeUpload = this.beforeUpload.bind(this);
  }

  beforeUpload(file) {
    if (!checkImage(file)) return;
    const imageSrc = window.URL.createObjectURL(file);
    this.props.changeImageSrc(imageSrc);
  }

  render() {
    const { loadPath } = this.props;
    return (
      <div className="upload-image-wrap">
        <Dragger
          name='file'
          multiple={false}
          showUploadList={false}
          beforeUpload={this.beforeUpload}
        >
          {
            loadPath ? <img src={loadPath} alt=""/> :
              <div>
                <p className='ant-upload-drag-icon'>
                  <Icon type='inbox' />
                </p>
                <h5 className='ant-upload-text'>
                  <span style={{ fontSize: 'larger' }}>封面图</span>
                  点击或拖拽图片到此进行截图
                </h5>
                <p className='ant-upload-hint'>建议图片比例16：9 - 大小小于2M - JPG格式</p>
              </div>
          }
        </Dragger>
      </div>
    );
  }
}


UploadAndCut.propTypes = {
  imageSrc: PropTypes.string,
  changeImageSrc: PropTypes.func,
  loadPath: PropTypes.string,
};


export default UploadAndCut;
