import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './listProceedingsReducer';
import {bindActionCreators} from 'redux';
import _ceil from 'lodash/ceil';
import Paginate from '../../components/page/Paginate';
import {FormattedDate} from 'react-intl';
import ChooseMember from './components/ChooseMember';

import config from '../../utils/config/globals';
import ComponentStatus from "../components/ComponentStatus";

@connect(state => ({
  loaded: state.backend.proceedings.loaded,
  proceedings: state.backend.proceedings.proceedings,
  grid: state.backend.proceedings.grid
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListProceedings extends Component {
  syncData = () => {
    const params = {q: '謝東閔', page: 1, limit: 0};
    const {syncProceedingsData, getTotalSize} = this.props;
    getTotalSize(params).then(result => {
      const totalSize = result.totalSize;
      const totalPage = _ceil(totalSize / 10.0);
      let page = 1;
      while (page <= totalPage) {
        syncProceedingsData({...params, page: page, limit: 10});
        page++;
      }
    });
    // syncProceedingsData(params);
    // searchAllForSync(params);
  };

  publishProceeding = (no) => {
    const {publish, list} = this.props;
    publish(no).then(() => {
      list();
    });
  };

  takedownProceeding = (no) => {
    const {takedown, list} = this.props;
    takedown(no).then(() => {
      list();
    });
  };

  componentDidMount() {
    const {list} = this.props;
    list();
  }

  render() {
    const {loaded, proceedings, grid, page, openModal} = this.props;
    if (!loaded) {
      return false;
    }
    return (
      <div className={"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"}>
        <h1 className="page-header">議事清單</h1>
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-primary" style={{marginBottom: '5px'}} onClick={openModal}>
              <i className="fa fa-refresh"/> 同步議事資料
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <div className="dataTable_wrapper">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
              <tr className={"row"}>
                <th className={"col-md-1"}>編號</th>
                <th className={"col-md-2"}>SNo.</th>
                <th className={"col-md-2"}>議會</th>
                <th className={"col-md-2"}>項目</th>
                <th className={"col-md-2"}>摘要</th>
                <th className={"col-md-1"}>時間</th>
                <th className={"col-md-1"}>公告</th>
                <th className={"col-md-1"}>功能</th>
              </tr>
              </thead>
              <tbody>
              {proceedings && proceedings.map(p =>
                <tr key={p.no} className={"row"}>
                  <td className={"col-md-1 text-center"}>{p.no}</td>
                  <td className={"col-md-2"}>{p.sno}</td>
                  <td className={"col-md-2"}>{p.councilChn}</td>
                  <td className={"col-md-2"}>{p.category}</td>
                  <td className={"col-md-2"}>{p.abstract}</td>
                  <td className={"col-md-1"}><FormattedDate value={p.date} {...config.dateformat.shortdatetime}/></td>
                  <td className={"col-md-1"}><ComponentStatus value={p.status}/></td>
                  <td className={"col-md-1"}>
                    {(p.status === 'DRAFT' || p.status === 'TAKEDOWN') ?
                      <button className="btn btn-primary" onClick={() => this.publishProceeding(p.no)}>發佈</button> :
                      <button className="btn btn-outline-danger" onClick={() => this.takedownProceeding(p.no)}>
                        下架</button>
                    }
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer small text-muted">
          <Paginate grid={grid} clickCallback={page}/>
        </div>
        <ChooseMember/>
      </div>
    );
  }
}
