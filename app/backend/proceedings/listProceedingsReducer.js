import queryString from 'query-string';
import _ceil from 'lodash/ceil';

const LOAD = 'council/backend/proceedings/LOAD';
const LOAD_SUCCESS = 'council/backend/proceedings/LOAD_SUCCESS';
const QUERY = 'council/backend/proceedings/QUERY';
const QUERY_SUCCESS = 'council/backend/proceedings/QUERY_SUCCESS';
const INSERT = 'council/backend/proceedings/INSERT';
const INSERT_SUCCESS = 'council/backend/proceedings/INSERT_SUCCESS';
const LOAD_ALL = 'council/backend/proceedings/LOAD_ALL';
const GET_TOTAL_SIZE = 'council/backend/proceedings/GET_TOTAL_SIZE';
const GET_TOTAL_SIZE_SUCCESS = 'council/backend/proceedings/GET_TOTAL_SIZE_SUCCESS';

const LIST = 'council/backend/proceedings/LIST';
const FETCHING = 'council/backend/proceedings/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/proceedings/FETCH_LIST_SUCCESS';
const PAGE = 'council/backend/proceedings/PAGE';
const SORT = 'council/backend/proceedings/SORT';
const PUBLISH = 'council/backend/proceedings/PUBLISH';
const PUBLISH_SUCCESS = 'council/backend/proceedings/PUBLISH_SUCCESS';
const TAKEDOWN = 'council/backend/proceedings/TAKEDOWN';
const TAKEDOWN_SUCCESS = 'council/backend/proceedings/TAKEDOWN_SUCCESS';

const initialState = {
  sync: {totalSize: 0},
  loaded: false,
  grid: {
    loading: false,
    sort: 'no',
    asc: true,
    page: 1,
    numPerPage: 10,
    pages: 1,
    totalSize: 0,
    table: 'proceedings'
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TOTAL_SIZE_SUCCESS:
      return {
        ...state,
        sync: {
          ...state.sync,
          totalSize: action.totalSize
        }
      };
    case LIST:
      return {
        ...state,
        loaded: false
      };
    case FETCHING:
      return {
        ...state,
        grid: {
          ...state.grid,
          loading: true
        }
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        loaded: true,
        grid: {
          ...state.grid,
          loading: false,
          totalSize: action.totalSize[0].totalSize,
          pages: _ceil(action.totalSize[0].totalSize / state.grid.numPerPage)
        },
        proceedings: action.proceedings
      };
    case SORT:
      return {
        ...state,
        grid: {
          ...state.grid,
          sort: action.sort,
          page: state.grid.sort === action.sort ? state.grid.page : 1,
          asc: state.grid.sort === action.sort ? !state.grid.asc : false
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
    default:
      return state;
  }
}

export function getTotalSize(params) {
  return (dispatch) => {
    dispatch({type: GET_TOTAL_SIZE});
    return fetch('/api/council/search' + buildQueryString(params), {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        return dispatch({type: GET_TOTAL_SIZE_SUCCESS, totalSize: json.info['total_found']});
      });
  };
}

export function syncProceedingsData(params) {
  return (dispatch) => {
    dispatch({type: LOAD});
    return fetch('/api/council/search' + buildQueryString(params), {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => {
        console.log(json);
        return dispatch(insertProceedings(json.records))
      });
  };
}

function buildQueryString(params) {
  return '?' + queryString.stringify((params));
}

function insertProceedings(data) {
  return (dispatch) => {
    dispatch({type: INSERT});
    return fetch('/api/db/insert', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'proceedings', data: data})
    }).then(response => response.json())
      .then(json => {
        console.log('result', json);
      });
  };
}

export function list() {
  return (dispatch) => {
    dispatch({type: LIST});
    return dispatch(fetchListAsync());
  };
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

function fetchListAsync() {
  return (dispatch, getState) => {
    dispatch({type: FETCHING});
    return fetch('/api/council/list' + buildQueryStringSql(getState()), {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch(fetchListSuccess(json)));
  };
}

function fetchListSuccess(proceedings) {
  console.log(proceedings[1]);
  return {
    type: FETCH_LIST_SUCCESS,
    proceedings: proceedings[0],
    totalSize: proceedings[1]
  };
}

function buildQueryStringSql(rootState) {
  const grid = rootState.backend.proceedings.grid;
  const params = {
    sortBy: grid.sort,
    asc: grid.asc,
    offset: (grid.page - 1) * grid.numPerPage,
    limit: grid.numPerPage,
    pageIndex: grid.page,
    pageSize: grid.numPerPage,
    table: grid.table
  };
  return '?' + queryString.stringify((params));
}

export function publish(no) {
  return (dispatch) => {
    dispatch({type: PUBLISH});
    return fetch('/api/council/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'proceedings', no: {no: no}, isShow: {isShow: 1}})
    }).then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };
}

export function takedown(no) {
  return (dispatch) => {
    dispatch({type: TAKEDOWN});
    return fetch('/api/council/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'proceedings', no: {no: no}, isShow: {isShow: 0}})
    }).then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };
}
