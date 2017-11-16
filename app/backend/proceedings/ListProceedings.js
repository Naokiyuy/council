import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './listProceedingsReducer';
import {bindActionCreators} from 'redux';
import _ceil from 'lodash/ceil';
import Paginate from '../../components/page/Paginate';

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
    const {loaded, proceedings, grid, page} = this.props;
    if (!loaded) {
      return false;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-primary" style={{marginBottom: '5px'}} onClick={this.syncData}>
              <i className="fa fa-refresh"/> 同步議事資料</button>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-table"></i> 議事清單
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="dataTable_wrapper">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>SNo.</th>
                    <th>議會</th>
                    <th>項目</th>
                    <th>摘要</th>
                    <th>時間</th>
                    <th>公告</th>
                    <th>功能</th>
                  </tr>
                  </thead>
                  <tbody>
                  {proceedings && proceedings.map(p =>
                    <tr key={p.no}>
                      <td>{p.no}</td>
                      <td>{p.sno}</td>
                      <td>{p.councilChn}</td>
                      <td>{p.category}</td>
                      <td>{p.abstract}</td>
                      <td>{p.date}</td>
                      <td>{p.isShow === 0 ? '否' : '是'}</td>
                      <td>
                        {p.isShow === 0 ?
                          <button className="btn btn-primary" onClick={() => this.publishProceeding(p.no)}>發佈</button> :
                          <button className="btn btn-outline-danger" onClick={() => this.takedownProceeding(p.no)}>下架</button>
                        }
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
                <Paginate grid={grid} clickCallback={page}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
