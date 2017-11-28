import React, {Component} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import {loadProfile} from '../content/contentReducer';
import {bindActionCreators} from 'redux';
import '../../utils/styles';

@connect(state => ({
  profile: state.content.profile
}), dispatch => bindActionCreators({loadProfile}, dispatch))
export default class Home extends Component {
  componentDidMount() {
    const {params, loadProfile} = this.props;
    document.title = `${params.name}議員主題網`;
    loadProfile(params.name);
  }
  render() {
    const {profile} = this.props;

    if (!profile) {
      return false;
    }

    return (
      <div className="wrapper">
        <Header name={profile.membername}/>
        {this.props.children}
        <Footer name={profile.membername}/>
      </div>
    );
  }
}
