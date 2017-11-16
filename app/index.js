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
        <Route name="" path="/" component={App}>
          <IndexRoute getComponent={(l, cb) => System.import('./frontend/home/Home').then(loadRoute(cb))}/>
          <Route name="首頁" path="/main" getComponent={(l, cb) => System.import('./frontend/home/Home').then(loadRoute(cb))}>
            <Route name="" path="/main/index" getComponent={(l, cb) => System.import('./frontend/content/Content').then(loadRoute(cb))}/>
            <Route name="內容" path="/main/others" getComponent={(l, cb) => System.import('./frontend/content/Others').then(loadRoute(cb))}>
              <Route name="公告消息" path="/main/others/info" getComponent={(l, cb) => System.import('./frontend/content/info/Info').then(loadRoute(cb))} />
              <Route name="新聞訊息" path="/main/others/news" getComponent={(l, cb) => System.import('./frontend/content/news/News').then(loadRoute(cb))} />
              <Route name="議員簡介" path="/main/others/profile" getComponent={(l, cb) => System.import('./frontend/content/profile/Profile').then(loadRoute(cb))} />
              <Route name="議事訊息" path="/main/others/council" getComponent={(l, cb) => System.import('./frontend/content/council/Council').then(loadRoute(cb))} />
              <Route name="服務行程" path="/main/others/service" getComponent={(l, cb) => System.import('./frontend/content/service/Service').then(loadRoute(cb))} />
            </Route>
          </Route>
          <Route name="Backend" path="/backend" getComponent={(l, cb) => System.import('./backend/home/Home').then(loadRoute(cb))}>
            <Route name="議事資料管理" path="/backend/proceedings" getComponent={(l, cb) => System.import('./backend/proceedings/ListProceedings').then(loadRoute(cb))} />
            <Route name="新聞資料管理" path="/backend/news" getComponent={(l, cb) => System.import('./backend/news/ListNews').then(loadRoute(cb))} />
            <Route name="服務行程管理" path="/backend/services" getComponent={(l, cb) => System.import('./backend/services/ListServices').then(loadRoute(cb))} />
            <Route name="議員資料管理" path="/backend/profile" getComponent={(l, cb) => System.import('./backend/profile/Profile').then(loadRoute(cb))} />
          </Route>
          <Route name="Not found" path="*" component={NotFound}/>
        </Route>
      </Router>
    </IntlProvider>
  </Provider>, document.getElementById('root')
);
