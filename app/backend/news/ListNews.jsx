import React, {Component} from 'react';
import AddNews from './components/AddNews';
import {connect} from 'react-redux';
import * as actionCreators from './listNewsReducer';
import {bindActionCreators} from 'redux';
import Paginate from '../../components/page/Paginate';
import NewsStatus from './components/NewsStatus';
import {Link} from 'react-router/es6';
import {FormattedDate} from 'react-intl';

import config from '../../utils/config/globals';

@connect(state => ({
  loaded: state.backend.news.loaded,
  news: state.backend.news.news
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListNews extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }

  render() {
    const {openModal, news, grid, page, loaded} = this.props;
    if (!loaded) {
      return false;
    }
    return (
      <div className={"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"}>
        <h1 className="page-header">新聞列表管理</h1>
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
                <th>新聞標題</th>
                <th>出處</th>
                <th>內容</th>
                <th>日期</th>
                <th>狀態</th>
                <th>功能</th>
              </tr>
              </thead>
              <tbody>
              {!news &&
              <tr>
                <td colSpan={8} className={"text-center"}>沒有新聞</td>
              </tr>
              }
              {news && news.map(n =>
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td>{n.membername}</td>
                  <td>{n.title}</td>
                  <td>{n.source}</td>
                  <td>{n.content}</td>
                  <td><FormattedDate value={n.createdTime} {...config.dateformat.shortdatetime}/></td>
                  <td><NewsStatus value={n.status}/></td>
                  <td>
                    <Link className={"btn btn-info"} to={`/backend/news/${n.id}/edit`}>
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
        <AddNews/>
      </div>
    );
  }
}
