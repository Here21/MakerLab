import React, { Component } from 'react';
import { Icon, message, Button } from 'antd';
import UploadImage from '../UploadImage';
import ImageCrop from '../ImageCrop';
import { Meteor } from 'meteor/meteor';
import Images from '../../../../imports/api/documents/collections/files';

class UploadAndCut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      uploadIng: false,
      localLoad: false,
      file: null,
      progress: null,
      imageSrc: null,
    };
    this.uploadIt = this.uploadIt.bind(this);
    this.downloadIt = this.downloadIt.bind(this);
    this.changeImageSrc = this.changeImageSrc.bind(this);
  }

  componentDidMount() {
    // Meteor.subscribe('files.all');
  }

  uploadIt() {
    const self = this;

    if (this.state.file) {
      const uploadInstance = Images.insert({
        file: this.state.file,
        meta: {
          // locator: self.props.fileLocator,
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

  downloadIt() {
    // Meteor.subscribe('files.all');
    // const file = Images.find().fetch();
    const file = Images.findOne({ _id: 'bijtuJpM8yquyJWuL' })
    console.log(file.link());
    console.log(file.get());
    // // const link = file.link();
    // // console.log(link);
    // // const get = file.get();
    // // console.log(get);
    // const result = Meteor.call('Images.findOne', 'bijtuJpM8yquyJWuL');
    // console.log(result);
  }

  changeImageSrc(src) {
    console.log(src);
    this.setState({
      imageSrc: src,
    });
  }

  render() {
    console.log(this.state.progress);
    const { imageSrc } = this.state
    return (
      <div style={{ marginTop: 16, height: 180 }}>
        <UploadImage imageSrc={imageSrc} changeImageSrc={this.changeImageSrc} />
        <ImageCrop imageSrc={imageSrc} changeImageSrc={this.changeImageSrc} />
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.uploadIt}
        >
          上传
        </Button>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.downloadIt}
        >
          下载
        </Button>
      </div>
    );
  }
}

export default UploadAndCut;
