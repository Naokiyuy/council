import React, {Component} from 'react';

export default class list extends Component {
  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">
          <i className="fa fa-table"></i> 議事清單
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
              <tr>
                <th>編號</th>
                <th>議會</th>
                <th>項目</th>
                <th>摘要</th>
                <th>時間</th>
                <th>功能</th>
              </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
