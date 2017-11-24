import queryString from 'query-string';
import _forEach from 'lodash/forEach';
import _forOwn from 'lodash/forOwn';
import allColors from '../../utils/config/colors';
import councilNumber from '../../utils/config/councilNumber';

const LOAD = 'council/home/index/LOAD';
const LOAD_SUCCESS = 'council/home/index/LOAD_SUCCESS';
const QUERY = 'council/home/index/QUERY';

const LOAD_PROFILE = 'council/home/index/LOAD_PROFILE';
const LOAD_PROFILE_SUCCESS = 'council/home/index/LOAD_PROFILE_SUCCESS';
const LOAD_NEWS = 'council/home/index/LOAD_NEWS';
const LOAD_NEWS_SUCCESS = 'council/home/index/LOAD_NEWS_SUCCESS';
const LOAD_MESSAGES = 'council/home/index/LOAD_MESSAGES';
const LOAD_MESSAGES_SUCCESS = 'council/home/index/LOAD_MESSAGES_SUCCESS';
const LOAD_SERVICE = 'council/home/index/LOAD_SERVICE';
const LOAD_SERVICE_SUCCESS = 'council/home/index/LOAD_SERVICE_SUCCESS';

const initialState = {
  councilDataYearly:{data: {}, loaded: false},
  councilDataCouncil: {data: {}, loaded: false},
  councilPerson: {data: {}, loaded: false},
  councilAdministrative: {data: {}, loaded: false},
  profile: {
    membername: '',
    politics: {
      content: ''
    },
    lifestory: {
      content: ''
    },
    remarks: {
      content: ''
    }
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      if (action.classify === 'year') {
        const year = [];
        const nums = [];
        const colors = [];
        _forEach(action.data['post_classification'].year, y => {
          if (parseInt(y.year) > 0) {
            year.push(y.year);
            nums.push(y.num);
            colors.push(allColors.barchartcolors);
          }
        });
        return {
          ...state,
          councilDataYearly: {
            data: {year, nums, colors},
            loaded: true
          }
        };
      } else if (action.classify === 'councilNumber'){
        const data = [];
        let colorCnt = 0;
        _forEach(action.data['post_classification'].councilNumber, c => {
          data.push({name: councilNumber[c.councilNumber], y: c.num, color: allColors.chartcolors[colorCnt]});
          colorCnt++;
        });
        return {
          ...state,
          councilDataCouncil: {
            data: {councilNumber: data},
            loaded: true
          }
        };
      } else if (action.classify === 'person') {
        const data = [];
        _forOwn(action.data['post_classification'].person, (v, k) => data.push(k));
        return {
          ...state,
          councilPerson: {
            data: {person: data},
            loaded: true
          }
        };
      } else {
        //administrative
        return {
          ...state,
          councilAdministrative: {
            data: {administrative: action.data['post_classification'].administrative},
            loaded: true
          }
        };
      }
    case LOAD_PROFILE_SUCCESS:
      if (!action.profile) {
        return state;
      }
      return {
        ...state,
        profile: {
          ...state.profile,
          membername: action.profile.name,
          politics: {
            content: action.profile.politics
          },
          lifestory: {
            content: action.profile.lifestory
          },
          remarks: {
            content: action.profile.remarks
          }
        }
      };
    case LOAD_NEWS_SUCCESS:
      return {
        ...state,
        news : action.news
      };
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages
      };
    case LOAD_SERVICE_SUCCESS:
      return {
        ...state,
        services: action.services
    };
    default:
      return state;
  }
}
export function queryCouncilData(params) {
  return (dispatch) => {
    dispatch({type: LOAD});
    return dispatch(queryByYear(params));
  }
}

function queryByYear(params) {
  return (dispatch) => {
    return fetch('/api/council/search' + buildQueryString(params), {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        if (json && json.info && json.info.status === 'success') {
          // get post classification
          return dispatch(loadSuccess(params.classify, json));
        }
      });
  };
}

function buildQueryString(params) {
  return '?' + queryString.stringify((params));
}

function loadSuccess(classify, result) {
  return {
    type: LOAD_SUCCESS,
    classify: classify,
    data: result
  };
}

export function loadProfile(name) {
  return (dispatch) => {
    dispatch({type: LOAD_PROFILE});
    return fetch(`/api/council/query-profile?name=${name}&table=profiles`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_PROFILE_SUCCESS, profile: json[0]}));
  };
}

export function loadNews(name) {
  return (dispatch) => {
    dispatch({type: LOAD_NEWS});
    return fetch(`/api/council/list?name=${name}&offset=0&limit=10&table=news&status=ONLINE`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_NEWS_SUCCESS, news: json}));
  };
}

export function loadMessages(name) {
  return (dispatch) => {
    dispatch({type: LOAD_MESSAGES});
    return fetch(`/api/council/list?name=${name}&offset=0&limit=10&table=messages&status=ONLINE`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_MESSAGES_SUCCESS, messages: json}));
  };
}

export function loadServices(name) {
  return (dispatch) => {
    dispatch({type: LOAD_SERVICE});
    return fetch(`/api/council/list?name=${name}&offset=0&limit=10&table=services&status=ONLINE`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_SERVICE_SUCCESS, services: json}));
  };
}
