import React, {Component} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../../utils/styles';

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
