import React, {Component} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import '../../utils/backend-styles';

export default class Home extends Component {
  render() {
    const {location} = this.props;
    console.log(location);
    return (
      <div>
        <Header />
        <div className={"container-fluid"} style={{paddingTop: '50px'}}>
          <div className={"row"}>
            {location.pathname.indexOf('login') === -1 && <Sidebar />}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
