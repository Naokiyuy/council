import React, {Component} from 'react';
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from '../usersReducer';
import {getMembers} from "../../proceedings/listProceedingsReducer";

@reduxForm({
    form: 'adduserform',
    fields: [
      'email', 'password'
    ],
    destroyOnUnmount: true
  }, state => ({
    isOpen: state.backend.users.adduser.isOpen,
    initialValues: state.backend.users.adduser.initialValues
  }), dispatch => bindActionCreators({...actionCreator, getMembers}, dispatch)
)
export default class AddUser extends Component {
  addUser = () => {
    const {values, addUser} = this.props;
    addUser(values);
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

    const {fields: {email, password}, isOpen, handleSubmit, openAndCloseModal} = this.props;

    return (
      <Modal
        className="Modal__Bootstrap modal-lg modal-dialog"
        closeTimeoutMS={150}
        isOpen={isOpen}
        style={modalCustom}
        shouldCloseOnOverlayClick={true}
        contentLabel={"addUser"}
      >
        <div className="modal-content">
          <div className="modal-header"><i className={"fa fa-plus"}/> 新增帳號</div>
          <form onSubmit={handleSubmit(this.addUser)}>
            <div className="modal-body">
              <div className="form-group">
                <div className="row">
                  <div className={`col-md-12`}>
                    <label className={`control-label`} htmlFor={"email"}>帳號(Email)</label>
                    <input type="text" className={"form-control"} id={"email"} {...email} required/>
                  </div>
                </div>
                <div className="row">
                  <div className={`col-md-12`}>
                    <label className={`control-label`} htmlFor={"password"}>密碼</label>
                    <input type="password" className={"form-control"} id={"password"} {...password} required/>
                  </div>
                </div>
              </div>
            </div>
            <div className={"modal-footer"}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6"/>
                  <div className="col-md-6 text-right">
                    <button type="submit" className={"btn btn-primary"}>新增</button>
                    {" "}
                    <button type="button" className={"btn btn-default"} onClick={openAndCloseModal}>取消</button>
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
