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
export default class info extends Component {
  componentWillMount() {
    const {params, setData} = this.props;
    setData(params.name, 'messages');
  }

  componentDidMount() {
    const {listAll} = this.props;
    setTimeout(() => {
      listAll();
    }, 2000);
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
            <h1 className="pull-left">公告訊息</h1>
            <ul className="pull-right breadcrumb">
              <li><Link to={`/frontend/${params.name}`}>首頁</Link></li>
              <li>最新消息</li>
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
                        <a href="#">{y.year} ({y.count})</a>
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
                  <h3><Link to={`/frontend/${params.name}/others/detail/messages/${m.id}`}>{m.title}</Link></h3>
                  <div dangerouslySetInnerHTML={{__html: m.content}} />
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
