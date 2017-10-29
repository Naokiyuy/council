import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute,
  Redirect,
  applyRouterMiddleware
} from 'react-router/es6';
import {syncHistoryWithStore} from 'react-router-redux';
import 'intl';
import {IntlProvider, FormattedMessage} from 'react-intl';
import queryString from 'query-string';
import {useScroll} from 'react-router-scroll';
import langsUtils from './utils/langsUtils';
import App from './App.js';
import configureStore from './utils/redux/configureStore';
import NotFound from './errorpage/NotFound';
import ReactHighCharts from 'react-highcharts';
import HighchartsExporting from 'highcharts-exporting';
import HighchartsExportCsv from 'highcharts-export-csv';

import './utils/styles';


const queryStr = location.search;
if (queryStr != '') {
  const query = require('url').parse(queryStr, true).query;
  if (query.reactRoute) {
    const reactRoute = decodeURIComponent(query.reactRoute);
    browserHistory.push(reactRoute);
  }
}

let store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const authenticate = (nextState, replace) => {
  if (localStorage) {
    const isLogin = localStorage.getItem('isLogged');

    if (isLogin !== 'true') {
      const location = nextState.location;
      let nextPath = nextState.location.pathname;
      if (location.search) {
        nextPath += '?' + queryString.stringify(location.query);
      }
      replace({
        pathname: '/login',
        query: {nextPath}
      });
    }
  }
};

const convertToValidLanguage = l => {
  if (l.indexOf('ja') != -1) {
    return 'ja';
  }
  return 'en';
};

const getLanguage = () => {
  if (localStorage && localStorage.getItem('bccLocale')) {
    return convertToValidLanguage(localStorage.getItem('bccLocale'));
  }
  const locale = convertToValidLanguage(navigator.language || navigator.browserLanguage);
  if (localStorage) {
    localStorage.setItem("bccLocale", locale);
  }
  return locale;
};

const loadRoute = cb => m => cb(null, m);

HighchartsExporting(ReactHighCharts.Highcharts);
HighchartsExportCsv(ReactHighCharts.Highcharts);

ReactDOM.render(
  <Provider store={store} key="provider">
    <IntlProvider locale={getLanguage()} messages={langsUtils.loadMessages(getLanguage())}>
      <Router history={history} render={applyRouterMiddleware(useScroll())}>
        <Route name="Home" path="/" component={App}>
          <IndexRoute getComponent={(l, cb) => System.import('./backend/home/Home').then(loadRoute(cb))}/>
          <Route name="Backend" path="/backend" getComponent={(l, cb) => System.import('./backend/home/Home').then(loadRoute(cb))}>
            <Route name="Proceedings" path="/backend/proceedings" getComponent={(l, cb) => System.import('./backend/proceedings/list').then(loadRoute(cb))} />
          </Route>
          <Route name="Not found" path="*" component={NotFound}/>
        </Route>
      </Router>
    </IntlProvider>
  </Provider>, document.getElementById('root')
);
