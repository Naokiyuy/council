import _ceil from 'lodash/ceil';
import queryString from 'query-string';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const LIST = 'council/backend/services/LIST';
const FETCHING = 'council/backend/services/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/services/FETCH_LIST_SUCCESS';
const PAGE = 'council/backend/services/PAGE';
const SORT = 'council/backend/services/SORT';
const PUBLISH = 'council/backend/services/PUBLISH';
const PUBLISH_SUCCESS = 'council/backend/services/PUBLISH_SUCCESS';
const TAKEDOWN = 'council/backend/services/TAKEDOWN';
const TAKEDOWN_SUCCESS = 'council/backend/services/TAKEDOWN_SUCCESS';

const ADD = 'council/backend/services/ADD';
const ADD_SUCCESS = 'council/backend/services/ADD_SUCCESS';
const EDIT = 'council/backend/services/EDIT';
const EDIT_SUCCESS = 'council/backend/services/EDIT_SUCCESS';
const OPEN_ADD_SERVICE = 'council/backend/services/OPEN_ADD_SERVICE';
const CLOSE_ADD_SERVICE = 'council/backend/services/CLOSE_ADD_SERVICE';
const LOAD_SERVICE = 'council/backend/services/LOAD_SERVICE';
const LOAD_SERVICE_SUCCESS = 'council/backend/services/LOAD_SERVICE_SUCCESS';

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
    table: 'services'
  },
  addservice: {
    title: '',
    source: '',
    date: '',
    contentEditor: EditorState.createEmpty(),
    isOpen: false
  },
  editservice: {
    id: undefined,
    title: '',
    date: '',
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
        services: action.services
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
    case OPEN_ADD_SERVICE:
      return {
        ...state,
        addservice: {
          ...state.addservice,
          isOpen: true
        }
      };
    case CLOSE_ADD_SERVICE:
      return {
        ...state,
        addservice: {
          ...initialState.addservice
        }
      };
    case LOAD_SERVICE_SUCCESS:
      const service = action.services[0];
      const serviceBlockFromHtml = htmlToDraft(service.content);
      return {
        ...state,
        editservice: {
          ...state.editservice,
          id: service.id,
          membername: service.membername,
          title: service.title,
          content: service.content,
          contentEditor: EditorState.createWithContent(ContentState.createFromBlockArray(serviceBlockFromHtml.contentBlocks, serviceBlockFromHtml.entityMap)),
          createdTime: service.createdTime,
          lastModified: service.lastModified,
          date: service.date,
          status: service.status
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

function fetchListSuccess(services) {
  console.log(services[1]);
  return {
    type: FETCH_LIST_SUCCESS,
    services: services[0],
    totalSize: services[1]
  };
}

function buildQueryStringSql(rootState) {
  const grid = rootState.backend.services.grid;
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

export function addService(values) {
  const params = {
    membername: values.membername,
    title: values.title,
    content: values.content,
    date: values.date
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
      body: JSON.stringify({table: 'services', data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: ADD_SUCCESS}));
  };
}

export function openModal() {
  return ({
    type: OPEN_ADD_SERVICE
  });
}

export function closeModal() {
  return ({
    type: CLOSE_ADD_SERVICE
  });
}

export function loadService(id) {
  return (dispatch) => {
    dispatch({type: LOAD_SERVICE});
    return fetch(`/api/council/query-data?id=${id}&table=services`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_SERVICE_SUCCESS, services: json}));
  };
}

export function updateService(values) {
  const params = {
    membername: values.membername,
    title: values.title,
    content: values.content,
    date: values.date,
    status: values.status
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
      body: JSON.stringify({table: 'services', no: {id: values.id}, data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: EDIT_SUCCESS}));
  };
}
