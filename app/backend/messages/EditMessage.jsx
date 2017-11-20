import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from './listMessagesReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Link, browserHistory} from 'react-router/es6';
import config from '../../utils/config/globals';

@reduxForm({
    form: 'editmessageform',
    fields: [
      'id', 'title', 'content', 'contentEditor', 'createdTime', 'lastModified', 'status', 'date'
    ],
    destroyOnUnmount: true
  }, state => ({
    initialValues: state.backend.messages.editmessage
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class EditMessage extends Component {
  componentDidMount() {
    const {params, loadMessage} = this.props;
    loadMessage(params.id);
  };
  update = () => {
    const {updateMessage, values} = this.props;
    updateMessage(values).then(() => {
      browserHistory.push("/backend/messages");
    });
  };
  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };
  render() {
    const {
      fields: {title, content, contentEditor, createdTime, lastModified, status, date},
      handleSubmit
    } = this.props;
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-pencil"></i> 編輯公告訊息
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.update)}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"title"}>標題</label>
                    <input className="form-control" id="title" type="text" aria-describedby="titleHelp"
                           placeholder="標題" {...title}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={"createdTime"}>建立時間</label>
                    <input className="form-control" id="createdTime" type="text" aria-describedby="nameHelp"
                           placeholder="建立時間" {...createdTime} disabled
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"status"}>狀態</label>
                    <select className={"form-control"} {...status}>
                      {config.newsstatus.map(n =>
                        <option value={n.value}>{n.label}</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={"date"}>時間</label>
                    <input className="form-control" id="date" type="text" aria-describedby="nameHelp"
                           placeholder="時間" {...date}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-12">
                    <label htmlFor={"content"}>內文</label>
                    <Editor id={"content"}
                            editorState={contentEditor.value}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="form-control"
                            onEditorStateChange={(v) => this.onChange(v, content, contentEditor)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6"/>
                  <div className="col-md-6 text-right">
                    <button type="submit" className={"btn btn-primary"}>更新</button>{" "}
                    <Link to={"/backend/messages"} className={"btn btn-default"}>取消</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer small text-muted">更新於 {lastModified.value}</div>
        </div>
      </div>
    );
  }
}
