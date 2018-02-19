import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Sidebar extends Component {
  handleLogout = () => {
    window.location.href = '/api/user/logout';
  };

  render() {
    return (
      <div className={"col-sm-3 col-md-2 sidebar"}>
        <ul className="nav nav-sidebar">
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Dashboard">
            <Link className="nav-link" to="/backend/proceedings">
              <i className="fa fa-fw fa-file"></i>
              <span className="nav-link-text">議事資料管理</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
            <Link className="nav-link" to="/backend/news">
              <i className="fa fa-fw fa-area-chart"></i>
              <span className="nav-link-text">新聞資料管理</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
            <Link className="nav-link" to="/backend/messages">
              <i className="fa fa-fw fa-table"></i>
              <span className="nav-link-text">公告訊息管理</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
            <Link className="nav-link nav-link-collapse collapsed" data-toggle="collapse" to="/backend/services" data-parent="#exampleAccordion">
              <i className="fa fa-fw fa-table"></i>
              <span className="nav-link-text">服務行程管理</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
            <Link className="nav-link" to="/backend/profiles">
              <i className="fa fa-fw fa-table"></i>
              <span className="nav-link-text">議員資料管理</span>
            </Link>
          </li>
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Example Pages">
            <Link className="nav-link nav-link-collapse collapsed" data-toggle="collapse" to="/backend/users" data-parent="#exampleAccordion">
              <i className="fa fa-fw fa-wrench"></i>
              <span className="nav-link-text">帳號管理</span>
            </Link>
            <ul className="sidenav-second-level collapse" id="collapseExamplePages">
              <li>
                <a href="login.html">Login Page</a>
              </li>
              <li>
                <a href="register.html">Registration Page</a>
              </li>
              <li>
                <a href="forgot-password.html">Forgot Password Page</a>
              </li>
              <li>
                <a href="blank.html">Blank Page</a>
              </li>
            </ul>
          </li>
          <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
            <a className="nav-link" href="javascript:" onClick={this.handleLogout}>
              <i className="fa fa-fw fa-table"></i>
              <span className="nav-link-text">登出</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
