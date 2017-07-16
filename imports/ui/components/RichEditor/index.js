import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.scss';

export default class RichEditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorState: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    console.log(editorState);
    this.setState({
      editorState,
    });
  }

  render() {
    return (
      <div className="rich-editor">
        <Editor
          editorState={this.state.editorState}
          localization={{ locale: 'zh' }}
          wrapperClassName="editor-wrapper"
          editorClassName="editor-content"
          toolbarClassName="editor-toolbar"
          onEditorStateChange={this.onEditorStateChange}
          hashtag={{}}
        />
      </div>
    );
    // return (
    //   <Editor
    //     editorState={this.state.editorState}
    //     toolbarClassName="toolbarClassName"
    //     wrapperClassName="wrapperClassName"
    //     editorClassName="editorClassName"
    //     onEditorStateChange={this.onEditorStateChange}
    //   />
    // );
  }
}
