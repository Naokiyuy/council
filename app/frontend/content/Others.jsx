import React, {Component} from 'react';
import Breadcrumbs from 'react-breadcrumbs';

export default class Others extends Component {
  render() {
    return (
      <div>
        <div className="breadcrumbs margin-bottom-50">
          <div className="container">
            <Breadcrumbs routes={this.props.routes}
                         params={this.props.params}
                         customClass="page-breadcrumb"
                         wrapperElement="ul"
                         itemElement="li"
                         separator={<i className="fa fa-circle"/>}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
