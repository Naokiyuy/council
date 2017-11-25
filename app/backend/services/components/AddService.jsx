import React, {Component} from 'react';
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from '../listServicesReducer';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

@reduxForm({
    form: 'addserviceform',
    fields: [
      'membername', 'title', 'date', 'content', 'contentEditor'
    ],
    destroyOnUnmount: true
  }, state => ({
    isOpen: state.backend.services.addservice.isOpen,
    initialValues: state.backend.services.addservice.initialValues
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class AddService extends Component {
  onChange = (value, textField, editor) => {
    editor.onChange(value);
    textField.onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  addService = () => {
    const {values, addService, closeModal, list} = this.props;
    addService(values).then(() => {
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
        className="Modal__Bootstrap modal-lg modal-dialog"
        closeTimeoutMS={150}
        isOpen={isOpen}
        style={modalCustom}
        shouldCloseOnOverlayClick={true}
        contentLabel={"addservice"}
      >
        <div className="modal-content">
          <div className="modal-header"><i className={"fa fa-plus"}/> 新增服務</div>
          <form onSubmit={handleSubmit(this.addService)}>
            <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor={"name"}>議員姓名</label>
                    <input className="form-control" id="title" type="text" aria-describedby="titleHelp"
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
                    <label htmlFor={"date"}>時間</label>
                    <input className="form-control" id="date" type="text" aria-describedby="titleHelp"
                           placeholder="時間" {...date}
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
            </div>
            <div className={"modal-footer"}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6"/>
                  <div className="col-md-6 text-right">
                    <button type="submit" className={"btn btn-primary"}>新增</button>
                    {" "}
                    <button type="button" className={"btn btn-default"} onClick={closeModal}>取消</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
