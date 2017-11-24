import React, {Component} from 'react';
import {Link} from 'react-router/es6';
import {connect} from 'react-redux';
import * as actionCreators from '../contentReducer';
import {bindActionCreators} from 'redux';

@connect(state => ({
  profile: state.content.profile,
  detail: state.content.detail
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class detail extends Component {
  componentDidMount() {
    const {params, loadDetail} = this.props;
    loadDetail(params.type, params.id);
  }
  render() {
    const {params, detail} = this.props;
    console.log(params);
    if (!detail) {
      return false;
    }

    return (
      <div>
        <div className="breadcrumbs ">
          <div className="container">
            <h1 className="pull-left">{detail.title}</h1>
            <ul className="pull-right breadcrumb">
              <li><Link to={`/frontend/${params.name}`}>首頁</Link></li>
              {params.type === 'news' && <li><Link to={`/frontend/${params.name}/others/news`}>新聞訊息</Link></li>}
              {params.type === 'messages' && <li><Link to={`/frontend/${params.name}/others/info`}>公告訊息</Link></li>}
              {params.type === 'services' && <li><Link to={`/frontend/${params.name}/others/service`}>服務行程</Link></li>}
              <li>訊息內容</li>
            </ul>
          </div>
        </div>
        <div className="container content">
          <div className="row-fluid privacy">
            <div dangerouslySetInnerHTML={{__html: detail.content}} />
          </div>
        </div>
      </div>
    );
  }
}
