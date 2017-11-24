import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../contentReducer';
import {bindActionCreators} from 'redux';

@connect(state => ({
  profile: state.content.profile
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class profile extends Component {
  componentDidMount() {
    const {params, loadProfile} = this.props;
    loadProfile(params.name);
  }

  render() {
    const {params, profile} = this.props;

    if (!profile) {
      return false;
    }

    return (
      <div>
        <div className="breadcrumbs">
          <div className="container">
            <h1 className="pull-left">{profile.membername}議員簡介</h1>
            <ul className="pull-right breadcrumb">
              <li><Link to={`/frontend/${params.name}`}>首頁</Link></li>
              <li>議員簡介</li>
            </ul>
          </div>
        </div>
        <div className="container content">
          <div className="row-fluid privacy">
            <h3>簡介</h3>
            <div dangerouslySetInnerHTML={{__html: profile.profile.content}} />
            <hr/>
            <h3>聯絡方式</h3>
            <div dangerouslySetInnerHTML={{__html: profile.contact.content}} />
            <hr/>
            <h3>學經歷</h3>
            <div dangerouslySetInnerHTML={{__html: profile.lifestory.content}} />
            <hr/>
            <h3>政見</h3>
            <div dangerouslySetInnerHTML={{__html: profile.politics.content}} />
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}
