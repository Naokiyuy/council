import React, {Component} from 'react';
import AddMessage from './components/AddMessage';
import {connect} from 'react-redux';
import * as actionCreators from './listMessagesReducer';
import {bindActionCreators} from 'redux';
import Paginate from '../../components/page/Paginate';
import ComponentStatus from '../components/ComponentStatus';
import {Link} from 'react-router/es6';

@connect(state => ({
  loaded: state.backend.messages.loaded,
  messages: state.backend.messages.messages
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class ListMessages extends Component {
  componentDidMount() {
    const {list} = this.props;
    list();
  }
  render() {
    const {openModal, messages, grid, page, loaded} = this.props;
    if (!loaded) {
      return false;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-primary" style={{marginBottom: '5px'}} onClick={openModal}>
              <i className="fa fa-plus"/> 新增</button>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-table"></i> 公告訊息
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="dataTable_wrapper">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                  <tr>
                    <th>編號</th>
                    <th>標題</th>
                    <th>內容</th>
                    <th>日期</th>
                    <th>狀態</th>
                    <th>功能</th>
                  </tr>
                  </thead>
                  <tbody>
                  {!messages &&
                  <tr>
                    <td colSpan={6} className={"text-center"}>沒有公告訊息</td>
                  </tr>
                  }
                  {messages && messages.map(n =>
                    <tr key={n.id}>
                      <td>{n.id}</td>
                      <td>{n.title}</td>
                      <td>{n.content}</td>
                      <td>{n.createdTime}</td>
                      <td><ComponentStatus value={n.status}/></td>
                      <td>
                        <Link className={"btn btn-info"} to={`/backend/messages/${n.id}/edit`}>
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
          </div>
        </div>
        <AddMessage />
      </div>
    );
  }
}
