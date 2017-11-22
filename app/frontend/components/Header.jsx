import React, {Component} from 'react';
import {Link} from 'react-router';

import '../../assets/frontend/css/style.css';
import '../../assets/frontend/css/headers/header-default.css';
import '../../assets/frontend/css/footers/footer-v1.css';

import '../../assets/frontend/css/theme-colors/default.css';
import '../../assets/frontend/css/theme-skins/dark.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header ">
        <div className="container">
          <Link className="logo" to="/">
            <h1>謝東閔議員主題網</h1>
          </Link>
        </div>
        <div className="collapse navbar-collapse mega-menu navbar-responsive-collapse">
          <div className="container">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                  最新消息
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/main/others/info">公告訊息</Link></li>
                  <li><Link to="/main/others/news">新聞訊息</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/main/others/profile">議員簡介</Link>
              </li>
              <li className="dropdown">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                  問政總覽
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/main/others/council">議事訊息</Link></li>
                  <li><Link to="/main/others/service">服務行程</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
