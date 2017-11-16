import _ceil from 'lodash/ceil';
import queryString from 'query-string';

const LIST = 'council/backend/news/LIST';
const FETCHING = 'council/backend/news/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/news/FETCH_LIST_SUCCESS';
const PAGE = 'council/backend/news/PAGE';
const SORT = 'council/backend/news/SORT';
const PUBLISH = 'council/backend/news/PUBLISH';
const PUBLISH_SUCCESS = 'council/backend/news/PUBLISH_SUCCESS';
const TAKEDOWN = 'council/backend/news/TAKEDOWN';
const TAKEDOWN_SUCCESS = 'council/backend/news/TAKEDOWN_SUCCESS';

const initialState = {
  loaded: false,
  grid: {
    loading: false,
    sort: 'no',
    asc: true,
    page: 1,
    numPerPage: 10,
    pages: 1,
    totalSize: 0,
    table: 'news'
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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

function fetchListSuccess(news) {
  console.log(news[1]);
  return {
    type: FETCH_LIST_SUCCESS,
    proceedings: news[0],
    totalSize: news[1]
  };
}

function buildQueryStringSql(rootState) {
  const grid = rootState.backend.news.grid;
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
