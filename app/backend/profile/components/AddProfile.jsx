import React, {Component} from 'react';
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from '../listProfileReducer';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

@reduxForm({
    form: 'addprofileform',
    fields: [
      'membername'
    ],
    destroyOnUnmount: true
  }, state => ({
    isOpen: state.backend.profiles.addprofile.isOpen,
    initialValues: state.backend.profiles.addprofile.initialValues
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class AddProfile extends Component {
  addProfile = () => {
    const {values, addProfile, closeModal, list} = this.props;
    addProfile(values).then(() => {
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
      fields: {membername},
      isOpen, closeModal, handleSubmit
    } = this.props;
    return (
      <Modal
        className="Modal__Bootstrap modal-lg"
        closeTimeoutMS={150}
        isOpen={isOpen}
        style={modalCustom}
        shouldCloseOnOverlayClick={true}
        contentLabel={"addprofile"}
      >
        <div className="card mb-3">
          <div className="card-header"><i className={"fa fa-plus"}/> 新增議員</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.addProfile)}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-12">
                    <label htmlFor={"name"}>姓名</label>
                    <input className="form-control" id="name" type="text" aria-describedby="titleHelp"
                           placeholder="姓名" {...membername}
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
