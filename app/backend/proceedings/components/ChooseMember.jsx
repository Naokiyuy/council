import React, {Component} from 'react';
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from '../listProceedingsReducer';
import _ceil from 'lodash/ceil';

@reduxForm({
  form: 'choosememberform',
  fields: [
    'membername'
  ],
  destroyOnUnmount: true
}, state => ({
  isOpen: state.backend.proceedings.choosemember.isOpen,
  members: state.backend.proceedings.members,
  initialValues: state.backend.proceedings.choosemember.initialValues
}), dispatch => bindActionCreators({...actionCreator}, dispatch))
export default class ChooseMember extends Component {
  getMembers = () => {
    const {getMembers} = this.props;
    getMembers();
  };

  syncData = () => {
    const {syncProceedingsData, getTotalSize, values, list, closeModal} = this.props;
    const params = {q: values.membername, page: 1, limit: 0};
    getTotalSize(params).then(result => {
      const totalSize = result.totalSize;
      const totalPage = _ceil(totalSize / 10.0);
      let page = 1;
      while (page <= totalPage) {
        syncProceedingsData({...params, page: page, limit: 10});
        page++;
      }
    }).then(() => {
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

    const {fields: {membername}, members, isOpen, closeModal, handleSubmit} = this.props;

    return (
      <Modal
        className="Modal__Bootstrap modal-lg modal-dialog"
        closeTimeoutMS={150}
        isOpen={isOpen}
        style={modalCustom}
        shouldCloseOnOverlayClick={true}
        contentLabel={"choosemember"}
        onAfterOpen={this.getMembers}
      >
        <div className="modal-content">
          <div className={"modal-header"}><i className={"fa fa-plus"}/> 新增新聞</div>
          <form onSubmit={handleSubmit(this.syncData)}>
            <div className={"modal-body"}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor={"member"}>選擇議員</label>
                    <select className={"form-control"} id={"member"} {...membername}>
                      <option value={""}></option>
                      {members && members.map(m =>
                        <option value={m.name}>{m.name}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
