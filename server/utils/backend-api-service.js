import needle from 'needle';
import config from '../config/config';
import queryString from 'query-string';

const service = {
  prefix: config.get('data:service-prefix'),
  getUrl: key => service.prefix + config.get('data-service-urls:' + key),
  get,
  post,
  upload
};

export default service;

function post(keyOfUrl, params, callback) {
  request(service.getUrl(keyOfUrl), params, callback);
}

function request(url, params, callback) {
  console.log({url, params});
  const sendTime = Date();
  needle.post(url, params, {open_timeout: 300000}, function (err, res) {
    const reqid = (res && res.headers && res.headers.reqid) ? res.headers.reqid : '';
    const receiveTime = Date();
    if (res && res.body) {
      console.log({url, reqid, sendTime, receiveTime, body: res.body});
      return callback(err, res.body);
    }
    console.log({url, reqid, sendTime, receiveTime});
    return callback(err, res);
  });
}

function get(keyOfUrl, params, callback) {
  requestGET(service.getUrl(keyOfUrl), params, callback);
}

function requestGET(url, params, callback) {
  console.log({url, params});
  const sendTime = Date();
  needle.get(url + '?' + queryString.stringify(params), {open_timeout: 300000}, function (err, res) {
    const reqid = (res && res.headers && res.headers.reqid) ? res.headers.reqid : '';
    const receiveTime = Date();
    if (res && res.body) {
      console.log({url, reqid, sendTime, receiveTime, body: res.body});
      return callback(err, res.body);
    }
    console.log({url, reqid, sendTime, receiveTime});
    return callback(err, res);
  });
}

function upload(keyOfUrl, params, callback) {
  const url = service.getUrl(keyOfUrl);
  console.log({url, params});
  const sendTime = Date();
  needle.post(url, params, {open_timeout: 0, multipart: true}, function (err, res) {
    const reqid = (res && res.headers && res.headers.reqid) ? res.headers.reqid : '';
    const receiveTime = Date();
    if (res && res.body) {
      console.log({url, reqid, sendTime, receiveTime, body: res.body});
      return callback(err, res.body);
    }
    console.log({url, reqid, sendTime, receiveTime});
    return callback(err, res);
  });
}

