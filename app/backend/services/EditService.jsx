import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from './listServicesReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Link, browserHistory} from 'react-router/es6';
import config from '../../utils/config/globals';
import {FormattedDate} from 'react-intl';
import DateTimeField from 'react-datetime';
import moment from 'moment';

@reduxForm({
    form: 'editmessageform',
    fields: [
      'id', 'membername', 'title', 'content', 'contentEditor', 'createdTime', 'lastModified', 'status', 'date'
    ],
    destroyOnUnmount: true
  }, state => ({
    initialValues: state.backend.services.editservice
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class EditService extends Component {
  componentDidMount() {
    const {params, loadService} = this.props;
    loadService(params.id);
  };
  update = () => {
    const {updateService, values} = this.props;
    updateService(values).then(() => {
      browserHistory.push("/backend/services");
    });
  };
  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  onDatePick = (newDate, date) => {
    date.onChange(moment(newDate, 'x').toDate());
  };

  render() {
    const {
      fields: {membername, title, content, contentEditor, createdTime, lastModified, status, date},
      handleSubmit
    } = this.props;
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-pencil"></i> 編輯服務行程
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.update)}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-4">
                    <label htmlFor={"name"}>議員姓名</label>
                    <input className="form-control" id="name" type="text" aria-describedby="titleHelp"
                           placeholder="議員姓名" {...membername}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"title"}>標題</label>
                    <input className="form-control" id="title" type="text" aria-describedby="titleHelp"
                           placeholder="標題" {...title}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"createdTime"}>建立時間</label>
                    <div className="form-control" id={"createdTime"}>
                      <FormattedDate value={createdTime.value} {...config.dateformat.shortdatetime}/>
                    </div>
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
                    <DateTimeField value={moment(date.value)}
                                   onChange={(newDate) => this.onDatePick(newDate, date)}
                                   timeFormat="hh:00 A"
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
          <div className="card-footer small text-muted">更新於 <FormattedDate value={lastModified.value} {...config.dateformat.shortdatetime}/></div>
        </div>
      </div>
    );
  }
}
