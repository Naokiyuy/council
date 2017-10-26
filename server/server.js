import express from 'express';
import session from 'express-session';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectTimeout from 'connect-timeout';
import errorhandler from 'errorhandler';

// import config from './config/config';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const app = express();
app.use(cookieParser('ccconsole'));

if (isDev) {
  // const favicon = require('serve-favicon');
  // app.use(favicon(path.join(__dirname, '../app/assets/images/favicon.ico')));
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.dev.babel.js');
  const compiler = webpack(webpackConfig.default);
  const middleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.default.output.publicPath,
    quiet: false,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(express.static('../app/'));
  app.use(express.static('../public/'));
  app.use(middleware);
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(session({
    secret: 'ccconsole',
    name: 'console',
    key: 'sid',
    cookie: {
      maxAge: 86400000,
      path: '/'
    },
    saveUninitialized: false,
    resave: false
  }));
} else {
  const redis = require('redis');
  const RedisStore = require('connect-redis')(session);
  app.use(session({
    secret: 'ccconsole',
    name: 'perfect_console',
    key: 'sid',
    store: new RedisStore({
      host: config.get('redis:host'),
      port: config.get('redis:port'),
      ttl: config.get('redis:ttl')
    }),
    cookie: {
      maxAge: 86400000,
      path: '/'
    },
    saveUninitialized: false,
    resave: false
  }));
}
app.use(connectTimeout(300000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use(logger);

// register routes

// error handlers
// development error handler
// will print stacktrace
if (process.env.NODE_ENV !== 'production') {
  app.use(errorhandler());
}

if (isDev) {
  app.use((req, res, next) => {
    let url = req.url;
    if (! url.startsWith('/api/')) {
      return res.redirect('/?reactRoute=' + encodeURIComponent(url));
    }
    next();
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  //res.status(err.status || 500);
  // console.error(err.stack);
  // res.status(500).send(err.stack);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
const port = isDev ? 80 : 3000;
const server = http.createServer(app);
server.on('connection', function (socket) {
  // Nodejs and express server closes connection after 2 minutes by default
  // setTimeout to 300 seconds
  socket.setTimeout(300 * 1000);
});
server.listen(port);
