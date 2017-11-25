import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import '../../utils/backend-styles';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={"container-fluid"}>
          <div className={"row"}>
            <Sidebar />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
