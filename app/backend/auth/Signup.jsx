import React, {Component} from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div className="col-sm-10 col-md-9 col-lg-6">
        <div className="g-brd-around g-brd-gray-light-v4 rounded g-py-40 g-px-30">
          <header className="text-center mb-4">
            <h2 className="h2 g-color-black g-font-weight-600">Signup</h2>
          </header>

          <form className="g-py-15">
            <div className="row">
              <div className="col-xs-12 col-sm-6 mb-4">
                <label className="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">First name:</label>
                <input className="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="email" placeholder="John"/>
              </div>

              <div className="col-xs-12 col-sm-6 mb-4">
                <label className="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Last name:</label>
                <input className="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="tel" placeholder="Doe"/>
              </div>
            </div>

            <div className="mb-4">
              <label className="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Email:</label>
              <input className="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="email" placeholder="johndoe@gmail.com"/>
            </div>

            <div className="row">
              <div className="col-xs-12 col-sm-6 mb-4">
                <label className="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Password:</label>
                <input className="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="password" placeholder="********"/>
              </div>

              <div className="col-xs-12 col-sm-6 mb-4">
                <label className="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Confirm Password:</label>
                <input className="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="password" placeholder="Password"/>
              </div>
            </div>

            <div className="row justify-content-between mb-5">
              <div className="col-8 align-self-center">
                <label className="form-check-inline u-check g-color-gray-dark-v5 g-font-size-13 g-pl-25">
                  <input className="g-hidden-xs-up g-pos-abs g-top-0 g-left-0" type="checkbox"/>
                  <div className="u-check-icon-checkbox-v6 g-absolute-centered--y g-left-0">
                    <i className="fa" data-check-icon=""></i>
                  </div>
                  I accept the <a href="#">Terms and Conditions</a>
                </label>
              </div>
              <div className="col-4 align-self-center text-right">
                <button className="btn btn-md u-btn-primary rounded g-py-13 g-px-25" type="button">Signup</button>
              </div>
            </div>
          </form>

          <footer className="text-center">
            <p className="g-color-gray-dark-v5 g-font-size-13 mb-0">Already have an account? <a className="g-font-weight-600" href="page-login-1.html">signin</a>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}
