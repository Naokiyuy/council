import React, {Component} from 'react';

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
          <a className="logo" href="index.php">
            <h1>謝東閔議員主題網</h1>
          </a>
        </div>
        <div className="collapse navbar-collapse mega-menu navbar-responsive-collapse">
          <div className="container">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                  最新消息
                </a>
                <ul className="dropdown-menu">
                  <li><a href="gallery-info.php">公告訊息</a></li>
                  <li><a href="gallery-news.php">新聞訊息</a></li>
                </ul>
              </li>
              <li>
                <a href="profile.php">議員簡介</a>
              </li>
              <li className="dropdown">
                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown">
                  問政總覽
                </a>
                <ul className="dropdown-menu">
                  <li><a href="gallery-council.php">議事訊息</a></li>
                  <li><a href="gallery-service.php">服務行程</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
