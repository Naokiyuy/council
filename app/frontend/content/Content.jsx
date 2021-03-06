import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import {Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router/es6';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from './contentReducer';
import {bindActionCreators} from 'redux';
import _findKey from 'lodash/findKey';
import _join from 'lodash/join';
import _values from 'lodash/values';
import {FormattedDate} from 'react-intl';
import config from '../../utils/config/globals';

import councilNumbers from '../../utils/config/councilNumber';

@connect(state => ({
  profile: state.content.profile,
  councilDataYearly: state.content.councilDataYearly,
  councilDataCouncil: state.content.councilDataCouncil,
  councilPerson: state.content.councilPerson,
  councilAdministrative: state.content.councilAdministrative,
  news: state.content.news,
  messages: state.content.messages,
  services: state.content.services,
  queryString: state.content.queryString
}), dispatch => bindActionCreators(actionCreators, dispatch))
export default class Content extends Component {
  componentDidMount() {
    const {queryCouncilData, loadProfile, params, loadNews, loadMessages, loadServices} = this.props;
    loadProfile(params.name).then(r => {
      queryCouncilData({q: r.profile.name, classify: 'year'});
      queryCouncilData({q: r.profile.name, classify: 'councilNumber'});
      queryCouncilData({q: r.profile.name, classify: 'person'});
      queryCouncilData({q: r.profile.name, classify: 'administrative'});

      loadNews(r.profile.name);
      loadMessages(r.profile.name);
      loadServices(r.profile.name);
    });
  }

  getCouncilNumber = (text) => {
    return _findKey(councilNumbers, c => {
      return c === text;
    });
  };

  pieCallback = (e) => {
    const {queryCouncilData, profile, addQueryString, queryString} = this.props;
    const councilName = e.point.name;
    let s = {...queryString, council: councilName};
    addQueryString(s);
    queryCouncilData({
      // q: profile.membername,
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      councilNumber: this.getCouncilNumber(councilName),
      classify: 'year'
    });
    queryCouncilData({
      // q: profile.membername,
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      councilNumber: this.getCouncilNumber(councilName),
      classify: 'person'
    });
    queryCouncilData({
      // q: profile.membername,
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      councilNumber: this.getCouncilNumber(councilName),
      classify: 'administrative'
    });
  };

  barCallback = (e) => {
    const {queryCouncilData, profile} = this.props;
    const category = e.point.category;
    const series = e.point.series;

    for (let i = 0; i < series.data.length; i++) {
      series.data[i].update({ color: '#5295d9' }, true, false);
    }
    e.point.update({ color: '#f00' }, true, false);

    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      year: category,
      classify: 'councilNumber'
    });
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      year: category,
      classify: 'person'
    });
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      year: category,
      classify: 'administrative'
    });
  };

  personCallback = (person) => {
    const {queryCouncilData, profile, addQueryString, queryString} = this.props;
    let s = {...queryString, person: person};
    addQueryString(s);
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      classify: 'year'
    });
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      classify: 'councilNumber'
    });
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      classify: 'administrative'
    });
  };

  administrativeCallback = (administrative) => {
    const {queryCouncilData, profile, addQueryString, queryString} = this.props;
    let s = {...queryString, administrative: administrative};
    addQueryString(s);
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      classify: 'year'
    });
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      classify: 'councilNumber'
    });
    queryCouncilData({
      q: profile.membername + '&' + _join(_values(this.props.queryString), '&'),
      classify: 'person'
    });
  };

  restore = () => {
    const {queryCouncilData, profile} = this.props;
    queryCouncilData({q: profile.membername, classify: 'year'});
    queryCouncilData({q: profile.membername, classify: 'councilNumber'});
    queryCouncilData({q: profile.membername, classify: 'person'});
    queryCouncilData({q: profile.membername, classify: 'administrative'});
    this.props.resetQueryString();
  };

  render() {
    const {councilDataYearly, councilDataCouncil, councilPerson, councilAdministrative, profile, news, messages, services} = this.props;

    if (!profile || !news || !messages || !services) {
      return false;
    }

    if (!councilDataYearly || !councilDataCouncil || !councilPerson || !councilAdministrative) {
      return false;
    }

    return (
      <div className="container content profile" style={{paddingBottom: '0px'}}>
        <div className="row margin-bottom-30">
          <div className="col-md-8 md-margin-bottom-40">
            <div className="headline"><h2>{profile.membername}議員</h2></div>
            <div className="row">
              <div className="col-sm-4">
                <img className="img-responsive margin-bottom-20" src={`/upload/${profile.profilePhoto}`} alt=""/>
              </div>
              <div className="col-sm-8">
                <div dangerouslySetInnerHTML={{__html: profile.lifestory.content}}/>
              </div>
            </div>

            <blockquote className="hero-unify">
              <div dangerouslySetInnerHTML={{__html: profile.remarks.content}}/>
            </blockquote>
          </div>
          <div className="col-md-4">
            <div className="headline"><h2>影像集錦</h2></div>
            <Carousel showThumbs={false} showArrows={true} showStatus={false} infiniteLoop={true} dynamicHeight={true}>
              {profile.slidePhotos && profile.slidePhotos.map((p, i) =>
                <div key={p.filename}>
                  <img src={`/upload/${p.filename}`} alt=""/>
                  <div className="legend" style={{opacity: '1'}}>
                    <p style={{color: '#ffffff'}}>
                      {profile[`slideLabels${i + 1}`]}
                    </p>
                  </div>
                </div>
              )}
            </Carousel>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-md-2"}>
            <button className={"btn btn-primary"} type={"button"} onClick={this.restore}>還原圖表</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <BarChart name={profile.membername} data={councilDataYearly.data} loaded={councilDataYearly.loaded}
                      callback={() => this.barCallback} restore={this.restore}/>
          </div>

        </div>
        <div className="row" style={{marginTop: '40px'}}>
          <div className="col-md-6">
            <PieChart name={profile.membername} data={councilDataCouncil.data} loaded={councilDataCouncil.loaded}
                      callback={() => this.pieCallback} restore={this.restore}/>
          </div>
          <div className="col-md-3">
            <div className="tab-v1">
              <Nav bsStyle="tabs" activeKey="1">
                <NavItem eventKey="1">相關議員</NavItem>
              </Nav>
              <div className="tab-content">
                <div className="tab-pane in active pre-scrollable">
                  <div className="panel-group acc-v1">
                    {councilPerson.data.person && councilPerson.data.person.map(p =>
                      <div key={p} className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a href="javascript:" data-parent="#accordion-v1" data-toggle="collapse"
                               className="accordion-toggle"
                               style={{cursor: 'pointer', textDecoration: 'none'}}
                               onClick={() => this.personCallback(p)}>
                              {p}
                            </a>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="tab-v1">
              <Nav bsStyle="tabs" activeKey="1">
                <NavItem eventKey="1">相關地點</NavItem>
              </Nav>
              <div className="tab-content">
                <div className="tab-pane in active">
                  <div className="panel-group acc-v1">
                    {councilAdministrative.data.administrative && councilAdministrative.data.administrative.map(a =>
                      <div key={a.administrative} className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a href="javascript:" data-parent="#accordion-v1" data-toggle="collapse"
                               className="accordion-toggle"
                               style={{cursor: 'pointer', textDecoration: 'none'}}
                               onClick={() => this.administrativeCallback(a.administrative)}>
                              {a.administrative}
                            </a>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container content" style={{paddingBottom: '150px'}}>
          <div className="row ">
            <div className="col-md-4 col-sm-6">
              <div className={"col-md-12"}>
                <div className="service-block service-block-sea service-or"
                     style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                  <div className="service-bg"></div>
                  <i className="icon-custom icon-color-light rounded-x icon-line fa fa-book"></i>
                  <h2 className="heading-md">最新消息</h2>

                </div>
              </div>
              <div className={"col-md-12"} style={{paddingLeft: '35px'}}>
                <ul className="list-unstyled categories" style={{listStyleType: 'lower-roman'}}>
                  {messages[0] && messages[0].map(m =>
                    <li>
                      <Link to={`/frontend/${profile.membername}/others/detail/messages/${m.id}`}>{m.title}</Link>
                      <small className="hex">(<FormattedDate value={m.date} {...config.dateformat.date}/>)</small>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className={"col-md-12"}>
                <div className="service-block service-block-red service-or"
                     style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                  <div className="service-bg"></div>
                  <i className="icon-custom icon-color-light rounded-x icon-line fa fa-users"></i>
                  <h2 className="heading-md">相關新聞</h2>

                </div>
              </div>
              <div className={"col-md-12"} style={{paddingLeft: '35px'}}>
                <ul className="list-unstyled categories" style={{listStyleType: 'lower-roman'}}>
                  {news[0] && news[0].map(n =>
                    <li>
                      <Link to={`/frontend/${profile.membername}/others/detail/news/${n.id}`}>{n.title}</Link>
                      <small className="hex">(<FormattedDate value={n.date} {...config.dateformat.date}/>)</small>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className={"col-md-12"}>
                <div className="service-block service-block-blue service-or"
                     style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                  <div className="service-bg"></div>
                  <i className="icon-custom icon-color-light rounded-x icon-line fa fa-rocket"></i>
                  <h2 className="heading-md">服務行程</h2>
                </div>
              </div>
              <div className={"col-md-12"} style={{paddingLeft: '35px'}}>
                <ul className="list-unstyled categories" style={{listStyleType: 'lower-roman'}}>
                  {services[0] && services[0].map(s =>
                    <li>
                      <Link to={`/frontend/${profile.membername}/others/detail/service/${s.id}`}>{s.title}</Link>
                      <small className="hex">(<FormattedDate value={s.date} {...config.dateformat.date}/>)</small>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
