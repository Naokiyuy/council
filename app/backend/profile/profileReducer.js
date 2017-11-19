import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const INSERT_PROFILE = 'council/backend/profile/INSERT_PROFILE';
const INSERT_PROFILE_SUCCESS = 'council/backend/profile/INSERT_PROFILE_SUCCESS';
const UPDATE_PROFILE = 'council/backend/profile/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'council/backend/profile/UPDATE_PROFILE_SUCCESS';
const QUERY_PROFILE = 'council/backend/profile/QUERY_PROFILE';
const QUERY_PROFILE_SUCCESS = 'council/backend/profile/QUERY_PROFILE_SUCCESS';

const initialState = {
  initialValues: {
    membername: '',
    politics: {
      content: '',
      contentEditor: EditorState.createEmpty()
    },
    lifestory: {
      content: '',
      contentEditor: EditorState.createEmpty()
    },
    remarks: {
      content: '',
      contentEditor: EditorState.createEmpty()
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY_PROFILE_SUCCESS:
      const profile = action.profile[0];
      const politicsBlockFromHtml = htmlToDraft(profile.politics);
      const lifestoryBlockFromHtml = htmlToDraft(profile.lifestory);
      const remarksBlockFromHtml = htmlToDraft(profile.remarks);
      return {
        ...state,
        initialValues: {
          ...state.initialValues,
          membername: profile.name,
          politics: {
            content: profile.politics,
            contentEditor: EditorState.createWithContent(ContentState.createFromBlockArray(politicsBlockFromHtml.contentBlocks, politicsBlockFromHtml.entityMap))
          },
          lifestory: {
            content: profile.lifestory,
            contentEditor: EditorState.createWithContent(ContentState.createFromBlockArray(lifestoryBlockFromHtml.contentBlocks, lifestoryBlockFromHtml.entityMap))
          },
          remarks: {
            content: profile.remarks,
            contentEditor: EditorState.createWithContent(ContentState.createFromBlockArray(remarksBlockFromHtml.contentBlocks, remarksBlockFromHtml.entityMap))
          }
        }
      };
    default:
      return state;
  }
}

export function insertProfile(values) {
  const params = {
    id: 1,
    name: values.membername,
    politics: values.politics.content,
    lifestory: values.lifestory.content,
    remarks: values.remarks.content
  };
  console.log('profile', params);
  return (dispatch) => {
    dispatch({type: INSERT_PROFILE});
    return fetch('/api/council/insert', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'profile', data: params})
    }).then(response => response.json())
      .then(json => {
        return dispatch({type: INSERT_PROFILE_SUCCESS});
      });
  };
}

export function queryProfile() {
  return (dispatch) => {
    dispatch({type: QUERY_PROFILE});
    return fetch('/api/council/query-data?id=1&table=profile', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch({type: QUERY_PROFILE_SUCCESS, profile: json}));
  };
}


export function updateProfile(values) {
  const params = {
    name: values.membername,
    politics: values.politics.content,
    lifestory: values.lifestory.content,
    remarks: values.remarks.content
  };
  return (dispatch) => {
    dispatch({type: UPDATE_PROFILE});
    return fetch('/api/council/update', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({table: 'profile', no: {id: 1}, data: params})
    }).then(response => response.json())
      .then(json => dispatch({type: UPDATE_PROFILE_SUCCESS}));
  };
}
