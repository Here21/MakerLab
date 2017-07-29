import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.handleCrop = this.handleCrop.bind(this);
  }
  handleCrop() {
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    const { imageSrc, changeImageSrc } = this.props;
    return (
      <div>
        {
          imageSrc ?
            <Cropper
              ref='cropper'
              src={imageSrc}
              style={{ height: 400, width: '100%' }}
              // Cropper.js options
              aspectRatio={16 / 9}
              guides={false}
              crop={this.handleCrop} /> : ''
        }
      </div>
    );
  }
}


ImageCrop.propTypes = {
  imageSrc: PropTypes.string,
  changeImageSrc: PropTypes.func,
};


export default ImageCrop;
