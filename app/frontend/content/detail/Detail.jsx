import React, {Component} from 'react';
import {Link} from 'react-router/es6';

export default class detail extends Component {
  render() {
    const {params} = this.props;
    console.log(params);
    return (
      <div>
        <div className="breadcrumbs ">
          <div className="container">
            <h1 className="pull-left">查封黨產應曉薇痛斥，執政者不捍衛分權制衡，還有誰能捍衛？</h1>
            <ul className="pull-right breadcrumb">
              <li><Link to={`/frontend/${params.name}`}>首頁</Link></li>
              <li><Link to={`/frontend/${params.name}/others/council`}>議事訊息</Link></li>
              <li>訊息內容</li>
            </ul>
          </div>
        </div>
        <div className="container content">
          <div className="row-fluid privacy">
            分權制衡為當代國際憲法核心思維，我國憲法本文也清楚架構五權分立模式，期望透過分權方式，達到制衡目的，以充分保障人權，並維持正當法律程序。應曉薇表示「黨產會為行政院轄下之特別委員會，行政執行署亦為行政院法務部下轄之機構，黨產會作成處分，責由行政執行署執行，左手進，右手出，兩手都在行政院管轄，誰來制衡？誰來監督？」
            法律規定執行債務人得提起救濟以避免國家濫權，其目的就是要讓司法權介入審查行政權處分是否適當，屬法律明訂權力分立之要求。應曉薇說國民黨已依法律規定，提起行政救濟及聲明異議，行政執行署卻未經法院判斷，逕行強制執行，不經令人質疑為何要畏懼監督？為何要急於執行完畢以阻斷執行債務人救濟可能？黨產會處分為何公然迴避司法權之檢驗？
            應曉薇痛斥小英政府處處宣揚要司法改革，但背地裡卻處處扼殺司法權的監督。難道所謂的司法改革，就是要讓行政權獨大，減少司法監督，導致對司法不滿的聲浪變小後，喜孜孜的宣布司法改革成功，而無視過往司法菁英們對人權保障的奮鬥與犧牲，大開民主倒車以為進步。
            <br/><br/>
            台北市議員應曉薇研究室
            02-27297708*6003

          </div>
        </div>
      </div>
    );
  }
}
