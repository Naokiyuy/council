import backendApiService from '../../../utils/backend-api-service';
import async from 'async';
import _ from 'lodash';

const service = {
  searchCouncil,
  searchAllForSync
};

export default service;


function searchCouncil(params, callback) {
  backendApiService.get('council:search', params, (err, body) => callback(err, body));
}

function searchAllForSync(params, callback) {
  async.series({
    proceedings: cb => listAll('council:search', params, cb)
  }, (err, r) => {
    const results = _.concat(r.proceedings);
    callback(err, {totalSize: results.length, results});
  });
}

function listAll(uri, params, callback) {
  const limit = 10;
  let offset = 0;
  let page = 1;
  let records = [];

  async.doWhilst(
    cb => {
      backendApiService.get(uri, {...params, limit, offset, page}, (err, body) => {
        records = _.concat(records, body.records);
        cb(null, body.records);
      })
    },
    r => {
      offset += _.toNumber(limit);
      return r.length !== 0;
    },
    err => {
      callback(err, records);
    }
  );
}
