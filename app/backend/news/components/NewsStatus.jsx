import React, {Component} from 'react';
import config from '../../../utils/config/globals';

export default class NewsStatus extends Component {
  getOption = (value) => {
    for (let i = 0; i < config.newsstatus.length; i++) {
      if (config.newsstatus[i].value == value) {
        return config.newsstatus[i];
      }
    }
  };

  render() {
    const o = this.getOption(this.props.value);
    return (
      <span><span className={o.labelclass}/> {o.label}</span>
    );
  }
}
