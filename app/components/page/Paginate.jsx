import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

export default class Paginate extends Component {

  render() {
    const {grid, clickCallback, type} = this.props;

    if (!grid || !grid.totalSize || grid.totalSize === 1) {
      return false;
    }
    return (
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">
            {(grid.page - 1) * grid.numPerPage + 1}
            -
            {grid.page === grid.pages && grid.totalSize}{grid.page !== grid.pages && grid.page * grid.numPerPage}{" "}
            of {grid.totalSize} records
          </div>
        </div>
        <div className="col-sm-12 col-md-7 text-right" style={{textAlign: 'right'}}>
          <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
            <ReactPaginate
              initialSelected={grid.page - 1}
              forceSelected={grid.page - 1}
              previousLabel={<i className="fa fa-angle-left"/>}
              nextLabel={<i className="fa fa-angle-right"/>}
              breakLabel={<a href="javascript:;">...</a>}
              pageNum={grid.pages}
              marginPageDisplayed={2}
              pageRangeDisplayed={5}
              clickCallback={clickCallback}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"paginate_button page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"paginate_button page-item previous"}
              nextClassName={"paginate_button page-item next"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
            />
          </div>
        </div>
      </div>
    );
  }
}
