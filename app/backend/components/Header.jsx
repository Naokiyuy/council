import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className={"container-fluid"}>
            <div className={"navbar-header"}>
              <a className="navbar-brand" href="#">議員主題網後台</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
