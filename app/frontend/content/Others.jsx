import React, {Component} from 'react';
import Breadcrumbs from 'react-breadcrumbs';

export default class Others extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
