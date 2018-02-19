import React, {Component} from 'react';
import classnames from 'classnames';
import AddUser from './components/AddUser';
import {connect} from 'react-redux';
import * as actionCreators from './usersReducer';
import {bindActionCreators} from 'redux';
import {FormattedDate} from 'react-intl';
import config from "../../utils/config/globals";

@connect(state => ({
  loaded: state.backend.users.loaded,
  users: state.backend.users.users,
  grid: state.backend.users.grid
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class listUsers extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  render() {
    const {openAndCloseModal, users, enable} = this.props;
    return (
      <div className={"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"}>
        <h1 className="page-header">帳號管理</h1>
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-primary" style={{marginBottom: '5px'}} onClick={openAndCloseModal}>
              <i className="fa fa-plus"/> 新增
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <div className="dataTable_wrapper">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
              <tr>
                <th>帳號</th>
                <th>建立時間</th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {users && users.map(u =>
                <tr>
                  <td>{u.email}</td>
                  <td><FormattedDate value={u.createdTime} {...config.dateformat.shortdatetime}/></td>
                  <td>
                    <button type={`button`} className={classnames({
                      btn: true,
                      'btn-primary': u.isEnable !== 1,
                      'btn-danger': u.isEnable === 1
                    })}
                      onClick={() => enable(u.email, u.isEnable === 0 ? 1 : 0)}
                    >
                      {u.isEnable === 0 ? '啟用' : '停用'}
                    </button>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <AddUser/>
      </div>
    );
  }
}
