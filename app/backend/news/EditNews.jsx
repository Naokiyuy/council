import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from './listNewsReducer';
import {getMembers} from '../proceedings/listProceedingsReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Link, browserHistory} from 'react-router/es6';
import config from '../../utils/config/globals';
import {FormattedDate} from 'react-intl';
import DateTimeField from 'react-datetime';
import moment from 'moment';

@reduxForm({
    form: 'editnewsform',
    fields: [
      'id', 'membername', 'title', 'source', 'url', 'content', 'contentEditor', 'createdTime', 'lastModified', 'status', 'date'
    ],
    destroyOnUnmount: true
  }, state => ({
    members: state.backend.proceedings.members,
    initialValues: state.backend.news.editnews
  }), dispatch => bindActionCreators({...actionCreator, getMembers}, dispatch)
)
export default class EditNews extends Component {
  componentDidMount() {
    const {params, loadNews, getMembers} = this.props;
    getMembers();
    loadNews(params.id);
  };

  update = () => {
    const {updateNews, values} = this.props;
    updateNews(values).then(() => {
      browserHistory.push("/backend/news");
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
      fields: {membername, title, source, url, content, contentEditor, createdTime, lastModified, status, date},
      handleSubmit, members
    } = this.props;

    return (
      <div>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div className="page-header">
            <i className="fa fa-pencil"></i> 編輯新聞
          </div>
          <div className="page-body">
            <form onSubmit={handleSubmit(this.update)}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor={"name"}>議員姓名</label>
                    <select className={"form-control"} id={"name"} {...membername}>
                      <option value={""}>選擇議員</option>
                      {members && members.map(m =>
                        <option value={m.name}>{m.name}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor={"title"}>標題</label>
                    <input className="form-control" id="title" type="text" aria-describedby="titleHelp"
                           placeholder="標題" {...title}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"source"}>出處</label>
                    <input className="form-control" id="source" type="text" aria-describedby="nameHelp"
                           placeholder="出處" {...source}
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
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor={"url"}>連結</label>
                    <input className="form-control" id="url" type="url" aria-describedby="nameHelp"
                           placeholder="連結" {...url}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"status"}>狀態</label>
                    <select className={"form-control"} {...status}>
                      {config.newsstatus.map(n =>
                        <option value={n.value}>{n.label}</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"date"}>新聞時間</label>
                    <DateTimeField value={moment(date.value)}
                                   onChange={(newDate) => this.onDatePick(newDate, date)}
                                   timeFormat="hh:00 A"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
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
                <div className="row">
                  <div className="col-md-6"/>
                  <div className="col-md-6 text-right">
                    <button type="submit" className={"btn btn-primary"}>更新</button>{" "}
                    <Link to={"/backend/news"} className={"btn btn-default"}>取消</Link>
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
