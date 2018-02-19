import _ceil from "lodash/ceil";

const LIST = 'council/backend/user/LIST';
const FETCHING = 'council/backend/user/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/user/FETCH_LIST_SUCCESS';
const ADD_NEW_USER = 'council/backend/user/ADD_NEW_USER';
const DELETE_NEW_USER = 'council/backend/user/DELET_NEW_USER';
const OPEN_AND_CLOSE_MODAL = 'council/backend/user/council/backend/user/OPEN_AND_CLOSE_MODAL';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const PAGE = 'council/backend/user/PAGE';
const SORT = 'council/backend/user/SORT';
const ENABLE = 'council/backend/user/ENABLE';

const initialState = {
  loaded: false,
  grid: {
    loading: false,
    sort: 'email',
    asc: true,
    page: 1,
    numPerPage: 10,
    pages: 1,
    totalSize: 0,
    table: 'users'
  },
  adduser: {
    isOpen: false
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
        users: action.users
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
    case OPEN_AND_CLOSE_MODAL:
      return {
        ...state,
        adduser: {
          ...state.adduser,
          isOpen: !state.adduser.isOpen
        }
      };
    default:
      return state;
  }
}

export function openAndCloseModal() {
  return {
    type: OPEN_AND_CLOSE_MODAL
  };
}

export function addUser(values) {
  return (dispatch) => {
    dispatch({type: ADD_NEW_USER});
    return fetch('/api/user/add', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: values.email, password: values.password})
    }).then(response => response.json())
      .then(json => {
        console.log(json);
      });
  };
}

export function list() {
  return (dispatch) => {
    dispatch({type: LIST});
    return dispatch(fetchListAsync());
  };
}

function fetchListAsync() {
  return (dispatch) => {
    dispatch({type: FETCHING});
    return fetch('/api/user/list', {
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(json => dispatch(fetchListSuccess(json)));
  };
}

function fetchListSuccess(users) {
  console.log(users);
  return {
    type: FETCH_LIST_SUCCESS,
    users: users[0],
    totalSize: users[1]
  };
}

export function enable(email, enable) {
  return (dispatch) => {
    dispatch({type: ENABLE});
    return fetch('/api/user/enable', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, isEnable: enable})
    }).then(response => response.json())
      .then(json => dispatch(fetchListAsync()));
  };
}
