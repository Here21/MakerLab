import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
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
    };
  }


  handleUpload(localFile) {
    console.log(localFile);
    getBase64(localFile, (imageUrl) => {
      const test = [
        'data:image/jpeg',
        'data:image/png;',
        'data:image/jpg;',
      ];
      console.log(imageUrl);
      if (!test.includes(imageUrl.slice(0, 15))) {
        return message.error('必须上传jpeg格式的图片');
      }
      this.setState({
        src: imageUrl,
        localLoad: false,
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        <Dragger
          name='file'
          multiple={false}
          showUploadList={false}
          beforeUpload={beforeUpload}
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

export default UploadAndCut;
