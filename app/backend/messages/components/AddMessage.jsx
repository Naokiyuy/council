import React, {Component} from 'react'
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from '../listMessagesReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

@reduxForm({
    form: 'addmessageform',
    fields: [
      'membername', 'title', 'date', 'content', 'contentEditor'
    ],
    destroyOnUnmount: true
  }, state => ({
    isOpen: state.backend.messages.addmessage.isOpen,
    initialValues: state.backend.messages.addmessage.initialValues
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class AddMessage extends Component {
  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  addMessage = () => {
    const {values, addMessage, closeModal, list} = this.props;
    addMessage(values).then(() => {
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
      fields: {membername, title, date, content, contentEditor},
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
            <form onSubmit={handleSubmit(this.addMessage)}>
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
                    <label htmlFor={"date"}>公告時間</label>
                    <input className="form-control" id="date" type="text" aria-describedby="dateHelp"
                           placeholder="公告時間" {...date}
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
