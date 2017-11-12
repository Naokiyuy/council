import backendApiService from '../../../utils/backend-api-service';

const service = {
  searchCouncil
};

export default service;


function searchCouncil(params, callback) {
  backendApiService.get('council:search', params, (err, body) => callback(err, body));
}
