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
  services: state.content.services
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
    console.log(e);
    const {queryCouncilData, profile} = this.props;
    const councilName = e.target.name;
    queryCouncilData({
      q: profile.membername,
      councilNumber: this.getCouncilNumber(councilName),
      classify: 'year'
    });
    queryCouncilData({
      q: profile.membername,
      councilNumber: this.getCouncilNumber(councilName),
      classify: 'person'
    });
    queryCouncilData({
      q: profile.membername,
      councilNumber: this.getCouncilNumber(councilName),
      classify: 'administrative'
    });
  };

  barCallback = (e) => {
    const {queryCouncilData, profile} = this.props;
    const category = e.target.category;
    queryCouncilData({
      q: profile.membername,
      year: category,
      classify: 'councilNumber'
    });
    queryCouncilData({
      q: profile.membername,
      year: category,
      classify: 'person'
    });
    queryCouncilData({
      q: profile.membername,
      year: category,
      classify: 'administrative'
    });
  };

  personCallback = (person) => {
    const {queryCouncilData, profile} = this.props;
    queryCouncilData({
      q: `${profile.membername}&${person}`,
      classify: 'year'
    });
    queryCouncilData({
      q: `${profile.membername}&${person}`,
      classify: 'councilNumber'
    });
    queryCouncilData({
      q: `${profile.membername}&${person}`,
      classify: 'administrative'
    });
  };

  administrativeCallback = (administrative) => {
    const {queryCouncilData, profile} = this.props;
    queryCouncilData({
      q: `${profile.membername}&${administrative}`,
      classify: 'year'
    });
    queryCouncilData({
      q: `${profile.membername}&${administrative}`,
      classify: 'councilNumber'
    });
    queryCouncilData({
      q: `${profile.membername}&${administrative}`,
      classify: 'person'
    });
  };

  restore = () => {
    const {queryCouncilData, profile} = this.props;
    queryCouncilData({q: profile.membername, classify: 'year'});
    queryCouncilData({q: profile.membername, classify: 'councilNumber'});
    queryCouncilData({q: profile.membername, classify: 'person'});
    queryCouncilData({q: profile.membername, classify: 'administrative'});
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
      <div className="container content profile" style={{paddingBottom: '0px'}} onClick={this.restore}>
        <div className="row margin-bottom-30">
          <div className="col-md-8 md-margin-bottom-40">
            <div className="headline"><h2>{profile.membername}議員</h2></div>
            <div className="row">
              <div className="col-sm-4">
                <img className="img-responsive margin-bottom-20" src="../../assets/frontend/img/index.jpg" alt=""/>
              </div>
              <div className="col-sm-8">
                <div dangerouslySetInnerHTML={{__html: profile.lifestory.content}} />
              </div>
            </div>

            <blockquote className="hero-unify">
              <div dangerouslySetInnerHTML={{__html: profile.remarks.content}} />
            </blockquote>
          </div>
          <div className="col-md-4">
            <div className="headline"><h2>影像集錦</h2></div>
            <Carousel showThumbs={false} showArrows={true} showStatus={false}>
              <div>
                <img src="../../assets/frontend/img/a03.jpg" alt=""/>
                <div className="legend">
                  <p>謝東閔在政治上的成就，採取精神與物質並重原則，先後提出小康計劃、消除髒亂運動</p>
                </div>
              </div>
              <div>
                <img src="../../assets/frontend/img/a02.JPG" alt=""/>
                <div className="legend">
                  <p>謝東閔先生全集紀念委員會，謝東閔先生全集，台北：國史館</p>
                </div>
              </div>
              <div>
                <img src="../../assets/frontend/img/a00.jpg" alt=""/>
                <div className="legend">
                  <p>台灣總統當選人陳水扁5月17日拜會總統府資政謝東閔，陳總統邀請謝東閔繼續擔任資政</p>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className="row">

          <div className="col-md-12">
            <BarChart data={councilDataYearly.data} loaded={councilDataYearly.loaded} callback={() => this.barCallback} restore={this.restore}/>
          </div>

        </div>
        <div className="row" style={{marginTop: '40px'}}>
          <div className="col-md-6">
            <PieChart data={councilDataCouncil.data} loaded={councilDataCouncil.loaded} callback={() => this.pieCallback} restore={this.restore}/>
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
                            <a href="javascript:" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle"
                               style={{cursor: 'pointer', textDecoration: 'none'}} onClick={() => this.personCallback(p)}>
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
                            <a href="javascript:" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle"
                               style={{cursor: 'pointer', textDecoration: 'none'}} onClick={() => this.administrativeCallback(a.administrative)}>
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
        <div className="container content">
          <div className="row ">
            <div className="col-md-4 col-sm-6">
              <div className="service-block service-block-sea service-or"
                   style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                <div className="service-bg"></div>
                <i className="icon-custom icon-color-light rounded-x icon-line icon-notebook"></i>
                <h2 className="heading-md">最新消息</h2>

              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="service-block service-block-red service-or"
                   style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                <div className="service-bg"></div>
                <i className="icon-custom icon-color-light rounded-x icon-line icon-users"></i>
                <h2 className="heading-md">相關新聞</h2>

              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="service-block service-block-blue service-or"
                   style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                <div className="service-bg"></div>
                <i className="icon-custom icon-color-light rounded-x icon-line icon-rocket"></i>
                <h2 className="heading-md">服務行程</h2>

              </div>
            </div>
          </div>
          <div className="row job-content">
            <div className="col-md-4 col-sm-6 md-margin-bottom-40">
              <ul className="list-unstyled categories" style={{listStyleType: 'lower-roman'}}>
                {messages[0] && messages[0].map(m =>
                  <li>
                    <a href="#">{m.title}</a>
                    <small className="hex">(<FormattedDate value={m.date} {...config.dateformat.date}/>)</small>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-4 col-sm-6 md-margin-bottom-40">
              <ul className="list-unstyled categories" style={{listStyleType: 'lower-roman'}}>
                {news[0] && news[0].map(n =>
                  <li>
                    <a href="#">{n.title}</a>
                    <small className="hex">(<FormattedDate value={n.date} {...config.dateformat.date}/>)</small>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-4 col-sm-6 md-margin-bottom-40">
              <ul className="list-unstyled categories" style={{listStyleType: 'lower-roman'}}>
                {services[0] && services[0].map(s =>
                  <li>
                    <a href="#">{s.title}</a>
                    <small className="hex">(<FormattedDate value={s.date} {...config.dateformat.date}/>)</small>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
