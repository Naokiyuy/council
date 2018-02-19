const controller = {
  routes,
  login,
  logout,
  add,
  list,
  enable
};

export default controller;

function routes(app) {
  app.post('/api/user/login', controller.login);
  app.route('/api/user/logout').all(controller.logout);
  app.post('/api/user/add', controller.add);
  app.get('/api/user/list', controller.list);
  app.post('/api/user/enable', controller.enable);
}

function login(req, res, next) {
  const params = req.body;

  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    const sqlQuery = `SELECT * FROM users WHERE email = '${params.email}' AND password = '${params.password}' AND isEnable = 1;`;
    const queryString = con.query(sqlQuery, [params.data, params.no], function (err, results) {
      if (err) {
        return next(err);
      }

      console.log('query result:', results);
      if (results && results.length === 1) {
        req.session.authenticated = true;
        res.type('application/json').send({status: 'OK'});
      } else {
        req.session.authenticated = false;
        res.type('application/json').send({status: 'fail'});
      }
      return null;
    });
    console.log(queryString.sql);
  });
}

function logout(req, res, next) {
  req.session.destroy(function () {
    "use strict";
    res.redirect('/backend/login');
  });
}

function add(req, res, next) {
  const params = req.body;

  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    const sqlQuery = `INSERT INTO users (email, password) VALUES ('${params.email}', '${params.password}');`;
    const queryString = con.query(sqlQuery, function (err, results) {
      if (err) {
        return next(err);
      }

      console.log('query result:', results);
      res.type('application/json').send(results);
      return null;
    });
    console.log(queryString.sql);
  });
}

function list(req, res, next) {
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    const sqlQuery = `SELECT email, isEnable, createdTime FROM users;SELECT COUNT(*) as totalSize FROM users;`;
    const queryString = con.query(sqlQuery, function (err, results) {
      if (err) {
        return next(err);
      }

      console.log('query result:', results);
      res.type('application/json').send(results);
      return null;
    });
    console.log(queryString.sql);
  });
}

function enable(req, res, next) {
  const params = req.body;
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    const sqlQuery = `UPDATE users SET isEnable = ${params.isEnable} WHERE email = '${params.email}';`;
    const queryString = con.query(sqlQuery, function (err, results) {
      if (err) {
        return next(err);
      }

      console.log('query result:', results);
      res.type('application/json').send(results);
      return null;
    });
    console.log(queryString.sql);
  });
}
