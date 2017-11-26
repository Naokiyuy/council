import queryString from 'query-string';
import _forEach from 'lodash/forEach';
import _forOwn from 'lodash/forOwn';
import _ceil from 'lodash/ceil';
import allColors from '../../utils/config/colors';
import councilNumber from '../../utils/config/councilNumber';

const LOAD = 'council/home/index/LOAD';
const LOAD_SUCCESS = 'council/home/index/LOAD_SUCCESS';
const LIST_ALL = 'council/home/index/LIST_ALL';
const LIST_ALL_SUCCESS = 'council/home/index/LIST_ALL_SUCCESS';
const PAGE = 'council/home/index/PAGE';
const SORT = 'council/home/index/SORT';
const SET_TABLE = 'council/home/index/SET_TABLE';
const SET_MEMBERNAME = 'council/home/index/SET_MEMBERNAME';
const SET_YEAR = 'council/home/index/SET_YEAR';

const LOAD_PROFILE = 'council/home/index/LOAD_PROFILE';
const LOAD_PROFILE_SUCCESS = 'council/home/index/LOAD_PROFILE_SUCCESS';
const LOAD_NEWS = 'council/home/index/LOAD_NEWS';
const LOAD_NEWS_SUCCESS = 'council/home/index/LOAD_NEWS_SUCCESS';
const LOAD_MESSAGES = 'council/home/index/LOAD_MESSAGES';
const LOAD_MESSAGES_SUCCESS = 'council/home/index/LOAD_MESSAGES_SUCCESS';
const LOAD_SERVICE = 'council/home/index/LOAD_SERVICE';
const LOAD_SERVICE_SUCCESS = 'council/home/index/LOAD_SERVICE_SUCCESS';

const LOAD_DETAIL = 'council/home/index/LOAD_DETAIL';
const LOAD_DETAIL_SUCCESS = 'council/home/index/LOAD_DETAIL_SUCCESS';

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
    },
    contact: {
      content: ''
    },
    profile: {
      content: ''
    }
  },
  grid: {
    loading: false,
    sort: 'date',
    asc: false,
    page: 1,
    numPerPage: 10,
    pages: 1,
    totalSize: 0,
    status: 'ONLINE'
  },
  loaded: false
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
          },
          contact: {
            content: action.profile.contact
          },
          profile: {
            content: action.profile.profile
          },
          profilePhoto: action.profile.profilePhoto,
          slidePhotos: [{filename: action.profile.slide1}, {filename: action.profile.slide2}, {filename: action.profile.slide3}],
          slideLabels1: action.profile.label1,
          slideLabels2: action.profile.label2,
          slideLabels3: action.profile.label3
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
    case LIST_ALL_SUCCESS:
      return {
        ...state,
        data: action.data,
        year: action.year,
        loaded: true,
        grid: {
          ...state.grid,
          loading: false,
          totalSize: action.totalSize[0].totalSize,
          pages: _ceil(action.totalSize[0].totalSize / state.grid.numPerPage)
        },
      };
    case SET_TABLE:
      return {
        ...state,
        grid: {
          ...state.grid,
          table: action.table
        }
      };
    case SET_MEMBERNAME:
      return {
        ...state,
        grid: {
          ...state.grid,
          name: action.membername
        }
      };
    case SET_YEAR:
      return {
        ...state,
        grid: {
          ...state.grid,
          year: action.year
        }
      };
    case PAGE:
      return {
        ...state,
        grid: {
          ...state.grid,
          page: action.page
        }
      };
    case LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.detail
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
    return fetch(`/api/council/list?name=${name}&offset=0&limit=3&table=news&status=ONLINE`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_NEWS_SUCCESS, news: json}));
  };
}

export function loadMessages(name) {
  return (dispatch) => {
    dispatch({type: LOAD_MESSAGES});
    return fetch(`/api/council/list?name=${name}&offset=0&limit=3&table=messages&status=ONLINE`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_MESSAGES_SUCCESS, messages: json}));
  };
}

export function loadServices(name) {
  return (dispatch) => {
    dispatch({type: LOAD_SERVICE});
    return fetch(`/api/council/list?name=${name}&offset=0&limit=3&table=services&status=ONLINE`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_SERVICE_SUCCESS, services: json}));
  };
}

function setTable(table) {
  return {
    type: SET_TABLE,
    table
  };
}

function setMembername(name) {
  return {
    type: SET_MEMBERNAME,
    membername: name
  };
}

function setYear(year) {
  return {
    type: SET_YEAR,
    year
  };
}

export function setData(name, table, year = undefined) {
  return (dispatch) => {
    dispatch(setMembername(name));
    dispatch(setTable(table));
    if (year) {
      dispatch(setYear(year));
    }
  };
}

export function listAll() {
  return (dispatch) => {
    dispatch({type: LIST_ALL});
    return dispatch(fetchListAsync());
  };
}

function fetchListAsync() {
  return (dispatch, getState) => {
    const grid = getState().content.grid;
    if (grid.year) {
      return fetch(`/api/council/list-by-year${buildQueryStringSql(getState())}`, {
        credentials: 'same-origin'
      }).then(response => response.json())
        .then(json => dispatch({type: LIST_ALL_SUCCESS, data: json[0], year: json[1], totalSize: json[2]}));
    } else {
      return fetch(`/api/council/list-all${buildQueryStringSql(getState())}`, {
        credentials: 'same-origin'
      }).then(response => response.json())
        .then(json => dispatch({type: LIST_ALL_SUCCESS, data: json[0], year: json[1], totalSize: json[2]}));
    }
  };
}

function buildQueryStringSql(rootState) {
  const grid = rootState.content.grid;
  const params = {
    sortBy: grid.sort,
    asc: grid.asc,
    offset: (grid.page - 1) * grid.numPerPage,
    limit: grid.numPerPage,
    pageIndex: grid.page,
    pageSize: grid.numPerPage,
    status: grid.status,
    table: grid.table,
    name: grid.name,
    year: grid.year
  };
  return '?' + queryString.stringify((params));
}

export function page(params) {
  return dispatch => {
    dispatch({type: PAGE, page: params.selected + 1});
    return dispatch(fetchListAsync());
  };
}

export function sort(sort) {
  return dispatch => {
    dispatch({
      type: SORT,
      sort
    });
    return dispatch(fetchListAsync());
  };
}

export function loadDetail(table, id) {
  return (dispatch) => {
    dispatch({type: LOAD_DETAIL});
    return fetch(`/api/council/query-data?table=${table}&id=${id}`, {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_DETAIL_SUCCESS, detail: json[0]}));
  };
}
