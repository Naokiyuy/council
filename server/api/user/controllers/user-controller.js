const controller = {
  routes,
  login,
  logout
};

export default controller;

function routes(app) {
  app.post('/api/user/login', controller.login);
  app.route('/api/user/logout').all(controller.logout);
}

function login(req, res, next) {
  const params = req.body;

  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    const sqlQuery = `SELECT * FROM users WHERE email = '${params.email}' AND password = '${params.password}';`;
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
