import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import { Button } from 'antd';
import 'cropperjs/dist/cropper.css';

class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.handleCrop = this.handleCrop.bind(this);
    this.cancelCrop = this.cancelCrop.bind(this);
  }

  handleCrop() {
    const dataURL = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.props.handleTailor(dataURL);
  }

  cancelCrop() {
    this.props.changeImageSrc('');
  }

  render() {
    const { imageSrc } = this.props;
    return (
      <div>
        <Cropper
          ref='cropper'
          src={imageSrc}
          style={{ height: 200, width: '100%' }}
          aspectRatio={16 / 9}
          guides
        />
        <div className="upload-btn-group">
          <Button
            className="btn"
            type="primary"
            onClick={this.handleCrop}
          >
            裁切上传
          </Button>
          <Button
            className="btn"
            type="primary"
            onClick={this.cancelCrop}
          >
            重选
          </Button>
        </div>
      </div>
    );
  }
}


ImageCrop.propTypes = {
  imageSrc: PropTypes.string,
  changeImageSrc: PropTypes.func,
  handleTailor: PropTypes.func,
};


export default ImageCrop;
