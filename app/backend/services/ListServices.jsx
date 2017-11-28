import React, {Component} from 'react';
import AddService from './components/AddService';
import {connect} from 'react-redux';
import * as actionCreators from './listServicesReducer';
import {bindActionCreators} from 'redux';
import Paginate from '../../components/page/Paginate';
import ComponentStatus from '../components/ComponentStatus';
import {Link} from 'react-router/es6';
import {FormattedDate} from 'react-intl';

import config from '../../utils/config/globals';

@connect(state => ({
  loaded: state.backend.services.loaded,
  services: state.backend.services.services,
  grid: state.backend.services.grid
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListServices extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  render() {
    const {openModal, services, grid, page, loaded} = this.props;
    if (!loaded) {
      return false;
    }
    return (
      <div className={"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"}>
        <h1 className="page-header">服務列表管理</h1>
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-primary" style={{marginBottom: '5px'}} onClick={openModal}>
              <i className="fa fa-plus"/> 新增
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <div className="dataTable_wrapper">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
              <tr>
                <th>編號</th>
                <th>議員姓名</th>
                <th>標題</th>
                <th>內容</th>
                <th>日期</th>
                <th>狀態</th>
                <th>功能</th>
              </tr>
              </thead>
              <tbody>
              {!services &&
              <tr>
                <td colSpan={7} className={"text-center"}>沒有服務行程</td>
              </tr>
              }
              {services && services.map(n =>
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td>{n.membername}</td>
                  <td>{n.title}</td>
                  <td>{n.content}</td>
                  <td><FormattedDate value={n.createdTime} {...config.dateformat.shortdatetime}/></td>
                  <td><ComponentStatus value={n.status}/></td>
                  <td>
                    <Link className={"btn btn-info"} to={`/backend/services/${n.id}/edit`}>
                      <i className={"fa fa-pencil"}/> 編輯
                    </Link>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
            <Paginate grid={grid} clickCallback={page}/>
          </div>
        </div>
        <AddService/>
      </div>
    );
  }
}
