import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from './listProfileReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Link, browserHistory} from 'react-router/es6';
import config from '../../utils/config/globals';
import {FormattedDate} from 'react-intl';
import Dropzone from 'react-dropzone';

@reduxForm({
    form: 'editprofileform',
    fields: [
      'membername', 'createdTime', 'lastModified',
      'politics', 'politicsEditor',
      'lifestory', 'lifestoryEditor',
      'remarks', 'remarksEditor',
      'contact', 'contactEditor',
      'profile', 'profileEditor',
      'profilePhoto', 'slidePhotos[]', 'slidePhotos[].filename', 'slideLabels1', 'slideLabels2', 'slideLabels3'
    ],
    destroyOnUnmount: true
  }, state => ({
    initialValues: state.backend.profiles.editprofile
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class EditProfile extends Component {
  componentDidMount() {
    const {params, loadProfile} = this.props;
    loadProfile(params.id);
  };
  update = () => {
    const {updateProfile, values} = this.props;
    updateProfile(values).then(() => {
      browserHistory.push("/backend/profiles");
    });
  };
  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };
  render() {
    const {
      fields: {
        membername, createdTime, lastModified, politics, politicsEditor, lifestory, lifestoryEditor,
        remarks, remarksEditor, contact, contactEditor, profile, profileEditor, profilePhoto, slidePhotos,
        slideLabels1, slideLabels2, slideLabels3
      },
      handleSubmit, fileUpload, fileUploadSlide
    } = this.props;

    return (
      <div>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div className="page-header">
            <i className="fa fa-pencil"></i> 編輯公告訊息
          </div>
          <div className="page-body">
            <form onSubmit={handleSubmit(this.update)}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor={"name"}>姓名</label>
                    <input className="form-control" id="name" type="text" aria-describedby="titleHelp"
                           placeholder="標題" {...membername}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={"createdTime"}>建立時間</label>
                    <div className="form-control" id={"createdTime"}>
                      <FormattedDate value={createdTime.value} {...config.dateformat.shortdatetime}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"form-group"}>
                <div className={"row"}>
                  <div className={"col-md-4"}>
                    <label htmlFor={"profilePhoto"}>照片上傳</label>
                    <Dropzone {...profilePhoto}
                              onDrop={(file) => fileUpload(file)}
                              className="profile-dropzone"
                              multiple={false}
                              id={"profilePhoto"}
                    >
                      {profilePhoto.value &&
                      <div className="text-center"
                           style={{height: '150px', verticalAlign: 'middle'}}>
                        <img src={`/upload/${profilePhoto.value}`} style={{height: '100%'}}/>
                      </div>
                      }
                      {!profilePhoto.value &&
                      <div className="text-center"
                           style={{height: '150px', verticalAlign: 'middle'}}>
                        <h4 className="sbold">請上傳大頭照</h4>
                      </div>
                      }
                    </Dropzone>
                  </div>
                  <div className={"col-md-8"}>
                    <label htmlFor={"slidePhotos"}>影像集錦</label>
                    <Dropzone {...slidePhotos}
                              onDrop={(file) => fileUploadSlide(file)}
                              className="profile-dropzone"
                              multiple={true}
                              id={"profilePhoto"}
                    >
                      {slidePhotos.length > 0 && slidePhotos.map(s =>
                        <div className="col-md-4 text-center"
                             style={{height: '150px', verticalAlign: 'middle'}}>
                          <img src={`/upload/${s.filename.value}`} style={{height: '100%'}}/>
                        </div>
                      )}
                      {slidePhotos.length < 0 &&
                      <div className="text-center"
                           style={{height: '150px', verticalAlign: 'middle'}}>
                        <h4 className="sbold">請上傳影像集錦</h4>
                      </div>
                      }
                    </Dropzone>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className={"row"}>
                  <div className={"col-md-4"}>
                    <label htmlFor={"slideLabels1"}>影像集錦文字1</label>
                    <input type={"text"} className={"form-control"} id={"slideLabels1"} {...slideLabels1}/>
                  </div>
                  <div className={"col-md-4"}>
                    <label htmlFor={"slideLabels2"}>影像集錦文字2</label>
                    <input type={"text"} className={"form-control"} id={"slideLabels2"} {...slideLabels2}/>
                  </div>
                  <div className={"col-md-4"}>
                    <label htmlFor={"slideLabels3"}>影像集錦文字3</label>
                    <input type={"text"} className={"form-control"} id={"slideLabels3"} {...slideLabels3}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={"profile"}>基本資料</label>
                    <Editor id={"profile"}
                            editorState={profileEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, profile, profileEditor)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={"politics"}>政見</label>
                    <Editor id={"politics"}
                            editorState={politicsEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, politics, politicsEditor)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={"lifestory"}>生平</label>
                    <Editor id={"lifestory"}
                            editorState={lifestoryEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, lifestory, lifestoryEditor)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={"remarks"}>說明</label>
                    <Editor id={"remarks"}
                            editorState={remarksEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, remarks, remarksEditor)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={"contact"}>聯絡方式</label>
                    <Editor id={"contact"}
                            editorState={contactEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, contact, contactEditor)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6"/>
                  <div className="col-md-6 text-right">
                    <button type="submit" className={"btn btn-primary"}>更新</button>{" "}
                    <Link to={"/backend/profiles"} className={"btn btn-default"}>取消</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer small text-muted">更新於 <FormattedDate value={lastModified.value} {...config.dateformat.shortdatetime}/></div>
        </div>
      </div>
    );
  }
}
