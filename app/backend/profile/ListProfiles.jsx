import React, {Component} from 'react';
import AddProfile from './components/AddProfile';
import {connect} from 'react-redux';
import * as actionCreators from './listProfileReducer';
import {bindActionCreators} from 'redux';
import Paginate from '../../components/page/Paginate';
import {Link} from 'react-router/es6';
import {FormattedDate} from 'react-intl';

import config from '../../utils/config/globals';

@connect(state => ({
  loaded: state.backend.profiles.loaded,
  profiles: state.backend.profiles.profiles
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListProfiles extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  render() {
    const {openModal, profiles, grid, page, loaded} = this.props;
    if (!loaded) {
      return false;
    }
    return (
      <div className={"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"}>
        <h1 className="page-header">議員列表管理</h1>
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
                <th>姓名</th>
                <th>日期</th>
                <th>功能</th>
              </tr>
              </thead>
              <tbody>
              {!profiles &&
              <tr>
                <td colSpan={6} className={"text-center"}>沒有服務行程</td>
              </tr>
              }
              {profiles && profiles.map(n =>
                <tr key={n.name}>
                  <td>{n.name}</td>
                  <td><FormattedDate value={n.createdTime} {...config.dateformat.shortdatetime}/></td>
                  <td>
                    <Link className={"btn btn-info"} to={`/backend/profiles/${n.name}/edit`}>
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
        <AddProfile/>
      </div>
    );
  }
}
