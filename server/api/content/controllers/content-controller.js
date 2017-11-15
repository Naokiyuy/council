import _ from 'lodash';
import campaignsService from '../services/content-service';

const controller = {
  routes,
  search,
  sqlConnection
};

export default controller;

function routes(app) {
  app.get('/api/council/search', controller.search);
  app.post('/api/db/query', controller.sqlConnection);
}

function search(req, res, next) {
  const params = _.merge(req.query, {
    // token: req.session.sessionToken,
    // customerId: req.session.customerId
  });
  campaignsService.searchCouncil(_.omitBy(params, _.isNull), (err, result) => {
    if (err) {
      return next(err);
    }

    res.type('application/json').send(result);
    return null;
  });
}

function sqlConnection(req, res, next) {
  const params = _.merge(req.body, {});
  req.getConnection(function(err, con) {
    if (err) {
      return next(err);
    }

    con.query('select * from test', [], function(err, results) {
      if (err) {
        return next(err);
      }

      console.log('query result:', results);
      res.type('application/json').send(results);
      return null;
    });
  });
}
