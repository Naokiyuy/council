import React, {Component} from 'react';
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from '../listNewsReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

@reduxForm({
    form: 'addnewsform',
    fields: [
      'title', 'source', 'url', 'content', 'contentEditor'
    ],
    destroyOnUnmount: true
  }, state => ({
    isOpen: state.backend.news.addnews.isOpen,
    initialValues: state.backend.news.addnews.initialValues
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class AddNews extends Component {
  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  addNews = () => {
    const {values, addNews, closeModal, list} = this.props;
    addNews(values).then(() => {
      list();
      closeModal();
    });
  };

  render() {
    const modalCustom = {
      overlay: {
        backgroundColor: 'rgba(9, 9, 9, 0.5)'
      },
      content: {
        margin: '60px auto'
      }
    };

    const {
      fields: {title, source, url, content, contentEditor},
      isOpen, closeModal, handleSubmit
    } = this.props;

    return (
      <Modal
        className="Modal__Bootstrap modal-lg"
        closeTimeoutMS={150}
        isOpen={isOpen}
        style={modalCustom}
        shouldCloseOnOverlayClick={true}
        contentLabel={"addnews"}
      >
        <div className="card mb-3">
          <div className="card-header"><i className={"fa fa-plus"}/> 新增新聞</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.addNews)}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor={"title"}>標題</label>
                    <input className="form-control" id="title" type="text" aria-describedby="titleHelp"
                           placeholder="標題" {...title}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={"source"}>出處</label>
                    <input className="form-control" id="source" type="text" aria-describedby="nameHelp"
                           placeholder="出處" {...source}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-12">
                    <label htmlFor={"url"}>連結</label>
                    <input className="form-control" id="url" type="url" aria-describedby="nameHelp"
                           placeholder="連結" {...url}
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
                    <button type="submit" className={"btn btn-primary"}>新增</button>{" "}
                    <button type="button" className={"btn btn-default"} onClick={closeModal}>取消</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
