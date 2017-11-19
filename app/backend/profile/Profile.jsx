import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import * as actionCreator from './profileReducer';
import {bindActionCreators} from 'redux';
import Dropzone from 'react-dropzone';
import {reduxForm} from 'redux-form'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

@reduxForm({
    form: 'profileform',
    fields: [
      'membername',
      'politics', 'politics.content', 'politics.contentEditor',
      'lifestory', 'lifestory.content', 'lifestory.contentEditor',
      'remarks', 'remarks.content', 'remarks.contentEditor'
    ],
    destroyOnUnmount: true
  }, state => ({
    initialValues: state.backend.profile.initialValues
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class Profile extends Component {
  componentDidMount() {
    const {queryProfile} =this.props;
    queryProfile();
  }

  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  insertProfile = (values) => {
    const {insertProfile} = this.props;
    insertProfile(values);
  };

  updateProfile = (values) => {
    const {updateProfile, queryProfile} = this.props;
    updateProfile(values).then(() => {
      queryProfile();
    });
  };

  render() {
    const {fields: {membername, politics, lifestory, remarks}, handleSubmit} = this.props;
    if (!politics) {
      return false;
    }
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-table"></i> 議員資料
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.updateProfile)}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"name"}>議員姓名</label>
                    <input className="form-control" id="name" type="text" aria-describedby="nameHelp"
                           placeholder="議員姓名" {...membername}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"politics"}>政見</label>
                    <Editor id={"politics"}
                            editorState={politics.contentEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, politics.content, politics.contentEditor)}
                    />
                  </div>
                  <div className={"col-md-6"}>
                    <label htmlFor={"politicsPreview"}>Html Preview</label>
                    <textarea
                      id={"politicsPreview"}
                      className={"form-control"}
                      disabled
                      value={draftToHtml(convertToRaw(politics.contentEditor.value.getCurrentContent()))}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"lifestory"}>生平</label>
                    <Editor id={"politics"}
                            editorState={lifestory.contentEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, lifestory.content, lifestory.contentEditor)}
                    />
                  </div>
                  <div className={"col-md-6"}>
                    <label htmlFor={"lifestoryPreview"}>Html Preview</label>
                    <textarea
                      id={"lifestoryPreview"}
                      className={"form-control"}
                      disabled
                      value={draftToHtml(convertToRaw(lifestory.contentEditor.value.getCurrentContent()))}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"remarks"}>說明</label>
                    <Editor id={"remarks"}
                            editorState={remarks.contentEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, remarks.content, remarks.contentEditor)}
                    />
                  </div>
                  <div className={"col-md-6"}>
                    <label htmlFor={"remarksPreview"}>Html Preview</label>
                    <textarea
                      id={"remarksPreview"}
                      className={"form-control"}
                      disabled
                      value={draftToHtml(convertToRaw(remarks.contentEditor.value.getCurrentContent()))}
                    />
                  </div>
                </div>
              </div>
              <button type={"submit"} className={"btn btn-md btn-danger"}>更新</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
