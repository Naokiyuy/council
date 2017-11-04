import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/Header';
import Content from '../content/Content';

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Content />
      </div>
    );
  }
}
