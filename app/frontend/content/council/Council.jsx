import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../contentReducer';
import {bindActionCreators} from 'redux';
import Paginate from '../../../components/page/Paginate';

@connect(state => ({
  profile: state.content.profile,
  data: state.content.data,
  year: state.content.year,
  grid: state.content.grid
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class Council extends Component {
  componentWillMount() {
    const {params, setData} = this.props;
    setData(params.name, 'proceedings', params.year);
  }

  componentDidMount() {
    const {listAll} = this.props;
    setTimeout(() => {
      listAll();
    }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    const {listAll, params, setData} = this.props;
    if (nextProps.params.year && (nextProps.params.year !== params.year)) {
      setData(params.name, 'proceedings', nextProps.params.year);
      setTimeout(() => {
        listAll();
      }, 2000);
    }
  }

  render() {
    const {params, data, year, grid, page} = this.props;

    if (!data) {
      return false;
    }
    return (
      <div>
        <div className="breadcrumbs margin-bottom-50">
          <div className="container">
            <h1 className="pull-left">議會訊息</h1>
            <ul className="pull-right breadcrumb">
              <li><Link to={`/frontend/${params.name}`}>首頁</Link></li>
              <li>問政總覽</li>
            </ul>
          </div>
        </div>
        <div className="container s-results margin-bottom-50">
          <div className="row">
            <div className="col-md-2 hidden-xs related-search">
              <div className="row">
                <div className="col-md-12 col-sm-4">
                  <h3>分布年代</h3>
                  <ul className="list-unstyled">
                    {year && year.map(y =>
                      <li key={y.year}>
                        <Link to={`/frontend/${params.name}/others/council/${y.year}`}>{y.year} ({y.count})</Link>
                      </li>
                    )}
                  </ul>
                  <hr/>
                </div>

              </div>
            </div>

            <div className="col-md-10">
              {data && data.map(m =>
                <div className="inner-results">
                  <h3><Link to={`/frontend/${params.name}/others/detail/proceedings/${m.id}`}>{m.sno}</Link></h3>
                  {m.abstract}
                </div>
              )}
              <hr/>

              <div className="margin-bottom-30"></div>

              <div className="text-left">
                <Paginate grid={grid} clickCallback={page}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
