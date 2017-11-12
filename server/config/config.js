import conf from 'nconf';
import path from 'path';

conf.argv().env({separator: '__'});

conf.add('environment', {type: 'file', file: path.join(__dirname, getEnvironment())});
conf.add('global', {type: 'file', file: path.join(__dirname, 'global.json')});
// conf.add('patterns', {type: 'file', file: path.join(__dirname, 'patterns.json')});

function getEnvironment() {
  const env = process.env.NODE_ENV || 'development';
  return './' + env + '.json';
}

export default conf;
