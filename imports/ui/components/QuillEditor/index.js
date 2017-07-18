import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.scss';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: this.props.editorHtml,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.triggerChange({ html });
  }

  triggerChange(changedValue) {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue.html);
    }
  }

  render() {
    return (
      <ReactQuill
        theme={'snow'}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
      />
    );
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    // [{ 'header': [1, 2, false] }, { 'font': [] }],
    // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    // [{'list': 'ordered'}, {'list': 'bullet'},
    //  {'indent': '-1'}, {'indent': '+1'}],
    // ['link', 'image'],
    // ['clean']
    // [{ font: [] }],
    // [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    // [{ header: 1 }, { header: 2 }],               // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    // [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    [{ align: [] }],
    ['link', 'image'],
    // ['clean'],
  ],
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'list', 'script', 'bullet', 'indent', 'color',
  'link', 'image', 'background', 'align',
];

Editor.propTypes = {
  placeholder: PropTypes.string,
  editorHtml: PropTypes.object,
  onChange: PropTypes.func,
};


export default Editor;

