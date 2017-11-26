import express from 'express';
import session from 'express-session';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectTimeout from 'connect-timeout';
import errorhandler from 'errorhandler';
import mysql from 'mysql';
import mycon from 'express-myconnection';
import fileUpload from 'express-fileupload';

import contentController from './api/content/controllers/content-controller';
// import config from './config/config';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const app = express();
app.use(cookieParser('council'));

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
  // app.use(express.static('../public/'));
  app.use(middleware);
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(session({
    secret: 'blueplanet',
    name: 'council',
    key: 'sid',
    cookie: {
      maxAge: 86400000,
      path: '/'
    },
    saveUninitialized: false,
    resave: false
  }));
} else {
  app.use(session({
    secret: 'blueplanet',
    name: 'council',
    key: 'sid',
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

// database connection
const dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'council',
  multipleStatements: true
};

app.use(mycon(mysql, dbOptions, 'request'));

// default options
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));

// app.use(logger);

// register routes
contentController.routes(app);

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
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
const port = isDev ? 80 : 3000;
// const port = 80;
const server = http.createServer(app);
server.on('connection', function (socket) {
  // Nodejs and express server closes connection after 2 minutes by default
  // setTimeout to 300 seconds
  socket.setTimeout(300 * 1000);
});
server.listen(port);
