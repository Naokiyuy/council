import React, {Component} from 'react';
import Header from '../components/Header';

import '../../utils/backend-styles';

export default class Home extends Component {
  render() {
    return (
      <div className="fixed-nav sticky-footer bg-dark">
        <Header />
        <div className="content-wrapper">
          <div className="container-fluid" style={{marginTop: '56px'}}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Tables</li>
            </ol>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
