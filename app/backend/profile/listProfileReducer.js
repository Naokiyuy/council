import _ceil from 'lodash/ceil';
import _forEach from 'lodash/forEach';
import queryString from 'query-string';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const LIST = 'council/backend/profiles/LIST';
const FETCHING = 'council/backend/profiles/FETCHING';
const FETCH_LIST_SUCCESS = 'council/backend/profiles/FETCH_LIST_SUCCESS';
const PAGE = 'council/backend/profiles/PAGE';
const SORT = 'council/backend/profiles/SORT';
const PUBLISH = 'council/backend/profiles/PUBLISH';
const PUBLISH_SUCCESS = 'council/backend/profiles/PUBLISH_SUCCESS';
const TAKEDOWN = 'council/backend/profiles/TAKEDOWN';
const TAKEDOWN_SUCCESS = 'council/backend/profiles/TAKEDOWN_SUCCESS';

const ADD = 'council/backend/profiles/ADD';
const ADD_SUCCESS = 'council/backend/profiles/ADD_SUCCESS';
const EDIT = 'council/backend/profiles/EDIT';
const EDIT_SUCCESS = 'council/backend/profiles/EDIT_SUCCESS';
const OPEN_ADD_PROFILE = 'council/backend/profiles/OPEN_ADD_PROFILE';
const CLOSE_ADD_PROFILE = 'council/backend/profiles/CLOSE_ADD_PROFILE';
const LOAD_PROFILE = 'council/backend/profiles/LOAD_PROFILE';
const LOAD_PROFILE_SUCCESS = 'council/backend/profiles/LOAD_PROFILE_SUCCESS';

const UPLOAD_FILE = 'council/backend/profiles/UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'council/backend/profiles/UPLOAD_FILE_SUCCESS';
const UPLOAD_SLIDE_FILE = 'council/backend/profiles/UPLOAD_SLIDE_FILE';
const UPLOAD_SLIDE_FILE_SUCCESS = 'council/backend/profiles/UPLOAD_SLIDE_FILE_SUCCESS';

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
    table: 'profiles'
  },
  addprofile: {
    membername: '',
    isOpen: false
  },
  editprofile: {
    membername: '',
    politics: '',
    lifestory: '',
    remarks: '',
    contact: '',
    profile: '',
    politicsEditor: EditorState.createEmpty(),
    lifestoryEditor: EditorState.createEmpty(),
    remarksEditor: EditorState.createEmpty(),
    contactEditor: EditorState.createEmpty(),
    profileEditor: EditorState.createEmpty(),
    slidePhotos: []
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
        profiles: action.profiles
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
    case OPEN_ADD_PROFILE:
      return {
        ...state,
        addprofile: {
          ...state.addprofile,
          isOpen: true
        }
      };
    case CLOSE_ADD_PROFILE:
      return {
        ...state,
        addprofile: {
          ...initialState.addprofile
        }
      };
    case LOAD_PROFILE_SUCCESS:
      const profile = action.profiles[0];
      const politicsBlockFromHtml = htmlToDraft(profile.politics || '');
      const lifestoryBlockFromHtml = htmlToDraft(profile.lifestory || '');
      const remarksBlockFromHtml = htmlToDraft(profile.remarks || '');
      const contactBlockFromHtml = htmlToDraft(profile.contact || '');
      const profileBlockFromHtml = htmlToDraft(profile.profile || '');
      return {
        ...state,
        editprofile: {
          ...state.editprofile,
          membername: profile.name,
          politics: profile.politics,
          politicsEditor: EditorState.createWithContent(ContentState.createFromBlockArray(politicsBlockFromHtml.contentBlocks, politicsBlockFromHtml.entityMap)),
          lifestory: profile.lifestory,
          lifestoryEditor: EditorState.createWithContent(ContentState.createFromBlockArray(lifestoryBlockFromHtml.contentBlocks, lifestoryBlockFromHtml.entityMap)),
          remarks: profile.remarks,
          remarksEditor: EditorState.createWithContent(ContentState.createFromBlockArray(remarksBlockFromHtml.contentBlocks, remarksBlockFromHtml.entityMap)),
          contact: profile.contact,
          contactEditor: EditorState.createWithContent(ContentState.createFromBlockArray(contactBlockFromHtml.contentBlocks, contactBlockFromHtml.entityMap)),
          profile: profile.profile,
          profileEditor: EditorState.createWithContent(ContentState.createFromBlockArray(profileBlockFromHtml.contentBlocks, profileBlockFromHtml.entityMap)),
          createdTime: profile.createdTime,
          lastModified: profile.lastModified,
          slidePhotos: [{filename: profile.slide1}, {filename: profile.slide2}, {filename: profile.slide3}],
          slideLabels1: profile.label1,
          slideLabels2: profile.label2,
          slideLabels3: profile.label3
        }
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        editprofile: {
          ...state.editprofile,
          profilePhoto: action.filename
        }
      };
    case UPLOAD_SLIDE_FILE_SUCCESS:
      return {
        ...state,
        editprofile: {
          ...state.editprofile,
          slidePhotos: [
            {
              filename: action.results.files[0] ? action.results.files[0].filename : ''
            },
            {
              filename: action.results.files[1] ? action.results.files[1].filename : ''
            },
            {
              filename: action.results.files[2] ? action.results.files[2].filename : ''
            }
          ]
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

function fetchListSuccess(profiles) {
  console.log(profiles[1]);
  return {
    type: FETCH_LIST_SUCCESS,
    profiles: profiles[0],
    totalSize: profiles[1]
  };
}

function buildQueryStringSql(rootState) {
  const grid = rootState.backend.profiles.grid;
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

export function addProfile(values) {
  const params = {
    name: values.membername
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
      body: JSON.stringify({table: 'profiles', data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: ADD_SUCCESS}));
  };
}

export function openModal() {
  return ({
    type: OPEN_ADD_PROFILE
  });
}

export function closeModal() {
  return ({
    type: CLOSE_ADD_PROFILE
  });
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
      .then(json => dispatch({type: LOAD_PROFILE_SUCCESS, profiles: json}));
  };
}

export function updateProfile(values) {
  const params = {
    name: values.membername,
    politics: values.politics,
    lifestory: values.lifestory,
    remarks: values.remarks,
    contact: values.contact,
    profile: values.profile,
    profilePhoto: values.profilePhoto,
    slide1: values.slidePhotos[0].filename,
    slide2: values.slidePhotos[1].filename,
    slide3: values.slidePhotos[2].filename,
    label1: values.slideLabels1,
    label2: values.slideLabels2,
    label3: values.slideLabels3
  };

  console.log(params);
  return (dispatch) => {
    dispatch({type: EDIT});
    return fetch('/api/council/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'profiles', no: {name: values.membername}, data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: EDIT_SUCCESS}));
  };
}

export function fileUpload(value) {
  console.log(value);
  let formData = new FormData();
  formData.append('file', value[0]);
  return (dispatch) => {
    dispatch({type: UPLOAD_FILE});
    return fetch('/api/file/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    }).then(response => response.json())
      .then(json => {
        console.log(json);
        return dispatch({type: UPLOAD_FILE_SUCCESS, filename: json.filename});
      });
  };
}

export function fileUploadSlide(value) {
  console.log(value);
  let formData = new FormData();
  _forEach(value, (v, i) => {
    formData.append(`file`, v);
  });
  return (dispatch) => {
    dispatch({type: UPLOAD_SLIDE_FILE});
    return fetch('/api/files/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    }).then(response => response.json())
      .then(json => {
        console.log('results', json);
        return dispatch({type: UPLOAD_SLIDE_FILE_SUCCESS, results: json});
      });
  };
}
