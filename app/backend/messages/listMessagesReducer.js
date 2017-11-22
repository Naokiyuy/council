import _ceil from 'lodash/ceil';
import queryString from 'query-string';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const LIST = 'council/backend/messages/LIST';
const FETCHING = 'council/backend/messages/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/messages/FETCH_LIST_SUCCESS';
const PAGE = 'council/backend/messages/PAGE';
const SORT = 'council/backend/messages/SORT';
const PUBLISH = 'council/backend/messages/PUBLISH';
const PUBLISH_SUCCESS = 'council/backend/messages/PUBLISH_SUCCESS';
const TAKEDOWN = 'council/backend/messages/TAKEDOWN';
const TAKEDOWN_SUCCESS = 'council/backend/messages/TAKEDOWN_SUCCESS';

const ADD = 'council/backend/messages/ADD';
const ADD_SUCCESS = 'council/backend/messages/ADD_SUCCESS';
const EDIT = 'council/backend/messages/EDIT';
const EDIT_SUCCESS = 'council/backend/messages/EDIT_SUCCESS';
const OPEN_ADD_MESSAGE = 'council/backend/messages/OPEN_ADD_MESSAGE';
const CLOSE_ADD_MESSAGE = 'council/backend/messages/CLOSE_ADD_MESSAGE';
const LOAD_MESSAGE = 'council/backend/messages/LOAD_MESSAGE';
const LOAD_MESSAGE_SUCCESS = 'council/backend/messages/LOAD_MESSAGE_SUCCESS';

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
    table: 'messages'
  },
  addmessage: {
    title: '',
    source: '',
    url: '',
    content: '',
    contentEditor: EditorState.createEmpty(),
    isOpen: false
  },
  editmessage: {
    id: undefined,
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
        messages: action.messages
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
    case OPEN_ADD_MESSAGE:
      return {
        ...state,
        addmessage: {
          ...state.addmessage,
          isOpen: true
        }
      };
    case CLOSE_ADD_MESSAGE:
      return {
        ...state,
        addmessage: {
          ...initialState.addmessage
        }
      };
    case LOAD_MESSAGE_SUCCESS:
      const message = action.messages[0];
      const messageBlockFromHtml = htmlToDraft(message.content);
      return {
        ...state,
        editmessage: {
          ...state.editmessage,
          id: message.id,
          membername: message.membername,
          title: message.title,
          content: message.content,
          contentEditor: EditorState.createWithContent(ContentState.createFromBlockArray(messageBlockFromHtml.contentBlocks, messageBlockFromHtml.entityMap)),
          createdTime: message.createdTime,
          lastModified: message.lastModified,
          date: message.date,
          status: message.status
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

function fetchListSuccess(messages) {
  console.log(messages[1]);
  return {
    type: FETCH_LIST_SUCCESS,
    messages: messages[0],
    totalSize: messages[1]
  };
}

function buildQueryStringSql(rootState) {
  const grid = rootState.backend.messages.grid;
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

export function addMessage(values) {
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
      body: JSON.stringify({table: 'messages', data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: ADD_SUCCESS}));
  };
}

export function openModal() {
  return ({
    type: OPEN_ADD_MESSAGE
  });
}

export function closeModal() {
  return ({
    type: CLOSE_ADD_MESSAGE
  });
}

export function loadMessage(id) {
  return (dispatch) => {
    dispatch({type: LOAD_MESSAGE});
    return fetch(`/api/council/query-data?id=${id}&table=messages`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: LOAD_MESSAGE_SUCCESS, messages: json}));
  };
}

export function updateMessage(values) {
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
      body: JSON.stringify({table: 'messages', no: {id: values.id}, data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: EDIT_SUCCESS}));
  };
}
