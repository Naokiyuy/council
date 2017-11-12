import _ from 'lodash';
import campaignsService from '../services/content-service';

const controller = {
  routes,
  search
};

export default controller;

function routes(app) {
  app.get('/api/council/search', controller.search);
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
