import _ceil from 'lodash/ceil';
import queryString from 'query-string';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';

const LIST = 'council/backend/news/LIST';
const FETCHING = 'council/backend/news/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/news/FETCH_LIST_SUCCESS';
const PAGE = 'council/backend/news/PAGE';
const SORT = 'council/backend/news/SORT';
const PUBLISH = 'council/backend/news/PUBLISH';
const PUBLISH_SUCCESS = 'council/backend/news/PUBLISH_SUCCESS';
const TAKEDOWN = 'council/backend/news/TAKEDOWN';
const TAKEDOWN_SUCCESS = 'council/backend/news/TAKEDOWN_SUCCESS';

const ADD = 'council/backend/news/ADD';
const ADD_SUCCESS = 'council/backend/news/ADD_SUCCESS';
const EDIT = 'council/backend/news/EDIT';
const EDIT_SUCCESS = 'council/backend/news/EDIT_SUCCESS';
const OPEN_ADD_NEWS = 'council/backend/news/OPEN_ADD_NEWS';
const CLOSE_ADD_NEWS = 'council/backend/news/CLOSE_ADD_NEWS';
const LOAD_NEWS = 'council/backend/news/LOAD_NEWS';
const LOAD_NEWS_SUCCESS = 'council/backend/news/LOAD_NEWS_SUCCESS';

const initialState = {
  loaded: false,
  grid: {
    loading: false,
    sort: 'id',
    asc: true,
    page: 1,
    numPerPage: 10,
    pages: 1,
    totalSize: 0,
    table: 'news'
  },
  addnews: {
    membername: '',
    title: '',
    source: '',
    url: '',
    content: '',
    contentEditor: EditorState.createEmpty(),
    isOpen: false
  },
  editnews: {
    id: undefined,
    membername: '',
    title: '',
    source: '',
    url: '',
    content: '',
    contentEditor: EditorState.createEmpty(),
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
        news: action.news
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
    case OPEN_ADD_NEWS:
      return {
        ...state,
        addnews: {
          ...state.addnews,
          isOpen: true
        }
      };
    case CLOSE_ADD_NEWS:
      return {
        ...state,
        addnews: {
          ...initialState.addnews
        }
      };
    case LOAD_NEWS_SUCCESS:
      const news = action.news[0];
      const newsBlockFromHtml = htmlToDraft(news.content);
      return {
        ...state,
        editnews: {
          ...state.editnews,
          id: news.id,
          membername: news.membername,
          title: news.title,
          content: news.content,
          contentEditor: EditorState.createWithContent(ContentState.createFromBlockArray(newsBlockFromHtml.contentBlocks, newsBlockFromHtml.entityMap)),
          url: news.url,
          source: news.source,
          createdTime: news.createdTime,
          lastModified: news.lastModified,
          date: news.date,
          status: news.status
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
    news: news[0],
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

export function addNews(values) {
  const params = {
    membername: values.membername,
    title: values.title,
    content: values.content,
    url: values.url,
    source: values.source
  };
  return (dispatch) => {
    dispatch({type: ADD});
    return fetch('/api/council/insert', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'news', data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: ADD_SUCCESS}));
  };
}

export function openModal() {
  return ({
    type: OPEN_ADD_NEWS
  });
}

export function closeModal() {
  return ({
    type: CLOSE_ADD_NEWS
  });
}

export function loadNews(id) {
  return (dispatch) => {
    dispatch({type: LOAD_NEWS});
    return fetch(`/api/council/query-data?id=${id}&table=news`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_NEWS_SUCCESS, news: json}));
  };
}

export function updateNews(values) {
  const params = {
    membername: values.membername,
    title: values.title,
    content: values.content,
    url: values.url,
    status: values.status,
    source: values.source,
    date: values.date.toISOString()
  };
  return (dispatch) => {
    dispatch({type: EDIT});
    return fetch('/api/council/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'news', no: {id: values.id}, data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: EDIT_SUCCESS}));
  };
}
