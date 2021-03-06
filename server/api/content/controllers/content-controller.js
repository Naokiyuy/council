import _ from 'lodash';
import contentService from '../services/content-service';
import randomString from 'random-string';

const controller = {
  routes,
  search,
  sqlConnection,
  sqlInsert,
  searchAll,
  queryDB,
  insertDB,
  updateDB,
  queryData,
  queryProfile,
  queryAll,
  getMembers,
  queryByYear,
  uploadFile,
  uploadFiles
};

export default controller;

function routes(app) {
  app.get('/api/council/search', controller.search);
  app.get('/api/council/search-all', controller.searchAll);
  app.post('/api/db/query', controller.sqlConnection);
  app.post('/api/db/insert', controller.sqlInsert);
  app.get('/api/council/list', controller.queryDB);
  app.post('/api/council/insert', controller.insertDB);
  app.post('/api/council/update', controller.updateDB);
  app.get('/api/council/query-data', controller.queryData);
  app.get('/api/council/query-profile', controller.queryProfile);
  app.get('/api/council/list-all', controller.queryAll);
  app.get('/api/council/list-by-year', controller.queryByYear);
  app.get('/api/council/get-members', controller.getMembers);
  app.post('/api/file/upload', controller.uploadFile);
  app.post('/api/files/upload', controller.uploadFiles);
}

function search(req, res, next) {
  const params = _.merge(req.query, {
    // token: req.session.sessionToken,
    // customerId: req.session.customerId
  });
  contentService.searchCouncil(_.omitBy(params, _.isNull), (err, result) => {
    if (err) {
      return next(err);
    }

    res.type('application/json').send(result);
    return null;
  });
}

function searchAll(req, res, next) {
  const params = _.merge(req.query, {
    // token: req.session.sessionToken,
    // customerId: req.session.customerId
  });
  contentService.searchAllForSync(_.omitBy(params, _.isNull), (err, result) => {
    if (err) {
      return next(err);
    }

    res.type('application/json').send(result);
    return null;
  });
}

function sqlConnection(req, res, next) {
  const params = _.merge(req.body, {});
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    con.query('select * from test', [], function (err, results) {
      if (err) {
        return next(err);
      }

      console.log('query result:', results);
      res.type('application/json').send(results);
      return null;
    });
  });
}

function sqlInsert(req, res, next) {
  const params = _.merge(req.body, {});
  const nestedData = [];

  _.forEach(params.data, function (p) {
    nestedData.push([
      p.sno,
      params.name,
      p.category,
      p.abstract,
      p.councilNumber,
      p.councilChn,
      p.conferenceNumber,
      p.conferenceChn,
      p.session,
      p.sessionChn,
      p.date,
      p.url
    ])
  });

  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }

    const queryString = con.query(
      'INSERT INTO ' + params.table +
      ' (sno, membername, category, abstract, councilNumber, councilChn, conferenceNumber, conferenceChn, session, sessionChn, date, url) VALUES ? ',
      [nestedData],
      function (err, results) {
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

function queryDB(req, res, next) {
  const params = _.merge(req.query, {});
  console.log('params', params);
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    let sqlQuery = '';
    if (params.status) {
      sqlQuery = `SELECT * FROM ${params.table} WHERE status = '${params.status}' AND membername = '${params.name}' LIMIT ${params.offset}, ${params.limit};SELECT COUNT(*) as totalSize FROM ${params.table} WHERE status = '${params.status}' AND membername = '${params.name}';`;
    } else {
      sqlQuery = `SELECT * FROM ${params.table} LIMIT ${params.offset}, ${params.limit};SELECT COUNT(*) as totalSize FROM ${params.table};`;
    }

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

function updateDB(req, res, next) {
  const params = _.merge(req.body, {});
  console.log('params', params);
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `UPDATE ${params.table} SET ? WHERE ?`;
    const queryString = con.query(sqlQuery, [params.data, params.no], function (err, results) {
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

function insertDB(req, res, next) {
  const params = _.merge(req.body, {});
  console.log('params', params);
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `INSERT INTO ${params.table} SET ?`;
    const queryString = con.query(sqlQuery, [params.data], function (err, results) {
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

function queryData(req, res, next) {
  const params = _.merge(req.query, {});
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `SELECT * FROM ${params.table} WHERE id=${params.id}`;
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

function queryProfile(req, res, next) {
  const params = _.merge(req.query, {});
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `SELECT * FROM ${params.table} WHERE name='${params.name}'`;
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

function queryAll(req, res, next) {
  const params = _.merge(req.query, {});
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `SELECT * FROM ${params.table} WHERE membername='${params.name}' and status = '${params.status}' LIMIT ${params.offset}, ${params.limit}; 
                      SELECT year(date) as year, count(*) as count from ${params.table} WHERE membername='${params.name}' and status = '${params.status}' group by year(date) order by year(date) desc;
                      SELECT COUNT(*) as totalSize FROM ${params.table} WHERE status = '${params.status}' AND membername = '${params.name}';`;
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


function queryByYear(req, res, next) {
  const params = _.merge(req.query, {});
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `SELECT * FROM ${params.table} WHERE membername='${params.name}' and status = '${params.status}' AND year(date) = ${params.year} LIMIT ${params.offset}, ${params.limit}; 
                      SELECT year(date) as year, count(*) as count from ${params.table} WHERE membername='${params.name}' and status = '${params.status}' group by year(date) order by year(date) desc;
                      SELECT COUNT(*) as totalSize FROM ${params.table} WHERE status = '${params.status}' AND membername = '${params.name}' AND year(date) = ${params.year};`;
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

function getMembers(req, res, next) {
  const params = _.merge(req.query, {});
  req.getConnection(function (err, con) {
    if (err) {
      return next(err);
    }
    const sqlQuery = `SELECT name from profiles;`;
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

function uploadFile(req, res, next) {
  let files = req.files;
  if (!files)
    return res.status(400).send('No files were uploaded.');

  let profileFile = files.file;
  const filepath = `/vol/web/upload/`;
  const filename = `${randomString()}.jpg`;
  profileFile.mv(filepath + filename, function(err) {
    if (err) {
      return next(err);
    }

    res.type('application/json').send({status: 'success', filename: filename});
    return null;
  });
}

function uploadFiles(req, res, next) {
  let files = req.files;
  if (!files)
    return res.status(400).send('No files were uploaded.');

  const filepath = `/vol/web/upload/`;
  let r = {
    totalSize: files.file.length,
    files: []
  };
  for (let i = 0 ; i < r.totalSize ; i++) {
    const filename = `${randomString()}.jpg`;
    files.file[i].mv(filepath + filename, function(err) {
      if (err) {
        return next(err);
      }
    });
    r.files.push({status: 'success', filename: filename});
  }

  console.log(r);
  res.type('application/json').send(r);
  return null;
}
