import React, { Component } from 'react';
import { message, Button } from 'antd';
import PropTypes from 'prop-types';
import UploadImage from '../UploadImage';
import ImageCrop from '../ImageCrop';
import Images from '../../../../imports/api/documents/collections/files';
import './style.scss';

class UploadAndCut extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cutDone: false,
      coverId: null,
      progress: null,
      imageSrc: null,
      loadPath: null,
    };

    this.changeImageSrc = this.changeImageSrc.bind(this);
    this.handleTailor = this.handleTailor.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // Meteor.subscribe('files.all');
  }

  changeImageSrc(src) {
    this.setState({
      imageSrc: src,
    });
  }

  handleTailor(dataUrl) {
    const self = this;
    const coverInstance = Images.insert({
      file: dataUrl,
      isBase64: true, // <— Mandatory
      // TODO: 使用子组件回传回来的文件名命名
      fileName: 'cover.jpeg', // <— Mandatory
    }, false);

    this.setState({
      loadPath: dataUrl,
      imageSrc: null,
      cutDone: true,
    })

    // coverInstance.on('uploaded', (error, fileObj) => {
    //   if (!error) {
    //     message.success('上传成功！');
    //     const loadLink = Images.link(fileObj);
    //     self.setState({
    //       loadPath: loadLink,
    //       imageSrc: null,
    //       cutDone: true,
    //       coverId: fileObj._id,
    //     });
    //     self.props.getCoverId({ loadLink, coverId: fileObj._id });
    //   }
    // });

    coverInstance.on('error', (error, fileObj) => {
      message.error('上传失败！');
      self.setState({
        imageSrc: null,
      });
    });

    // coverInstance.start();
    this.props.handleStartUploadCover(coverInstance);
  }

  handleCancel() {
    Images.remove({ _id: this.state.coverId }, (err) => {
      console.log(err);
    });
    this.setState({
      cutDone: false,
      coverId: null,
      imageSrc: null,
      loadPath: null,
    });
  }

  render() {
    const { imageSrc, cutDone, loadPath } = this.state;
    return (
      <div className="upload-cut-warp">
        {
          imageSrc ?
            <ImageCrop
              imageSrc={imageSrc}
              changeImageSrc={this.changeImageSrc}
              handleTailor={this.handleTailor}
            />
            : <UploadImage
              imageSrc={imageSrc}
              loadPath={loadPath}
              changeImageSrc={this.changeImageSrc}
            />
        }
        {
          cutDone ?
            <div className="upload-btn-group">
              <Button
                className="btn"
                type="primary"
                onClick={this.handleCancel}
              >
                删除重选
              </Button>
            </div> : ''
        }
      </div>
    );
  }
}

UploadAndCut.propTypes = {
  getCoverId: PropTypes.func,
  handleStartUploadCover: PropTypes.func,
};

export default UploadAndCut;
