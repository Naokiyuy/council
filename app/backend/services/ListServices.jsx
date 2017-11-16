import React, {Component} from 'react';

export default class ListServices extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-table"></i> 服務列表
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="dataTable_wrapper">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0"></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
