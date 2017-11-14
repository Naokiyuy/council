import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Content from '../content/Content';
import Footer from '../components/Footer';

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
