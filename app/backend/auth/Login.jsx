import React, {Component} from 'react';
import './login.css';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import * as actionCreator from './loginReducer';
import {browserHistory} from 'react-router/es6';

@reduxForm({
    form: 'loginform',
    fields: [
      'email', 'password'
    ],
    destroyOnUnmount: true
  }, state => ({
    initialValues: state.backend.login.data
  }), dispatch => bindActionCreators({...actionCreator}, dispatch)
)
export default class Login extends Component {
  login = (values) => {
    const {login} = this.props;
    login(values).then(r => {
      if (r.status === 'OK') {
        browserHistory.push('/backend/');
      }
    });
  };

  render() {
    const {fields: {email, password}, handleSubmit} = this.props;
    return (
      <div className="col-md-offset-4 col-md-4">
        <div className="login__box">
          <header className="text-center">
            <h2 className="h2">議員主題網</h2>
          </header>

          <form className="form" onSubmit={handleSubmit(this.login)}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <label>Email:</label>
                  <input className="form-control" type="email" placeholder="Email" {...email}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <label>Password:</label>
                  <input className="form-control" type="password" placeholder="Password" {...password}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-offset-3 col-md-6">
                  <button className="btn btn-md btn-block btn-primary rounded" type="submit">登入</button>
                </div>
              </div>
            </div>
          </form>

          <footer className="text-center">
            <p className="g-color-gray-dark-v5 g-font-size-13 mb-0">Don't have an account? <a
              className="g-font-weight-600" href="page-signup-2.html">signup</a>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}
