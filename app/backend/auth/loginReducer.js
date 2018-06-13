const LOGIN = 'council/backend/login/LOGIN';
const LOGIN_SUCCESS = 'council/backend/login/LOGIN_SUCCESS';
const LOGIN_FAIL = 'council/backend/login/LOGIN_FAIL';

const initialState = {
  data: {
    email: '',
    password: ''
  },
  status: 'fail'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (localStorage) {
        localStorage.setItem('isLogged', true);
      }
      return {
        ...state,
        status: action.status
      };
    case LOGIN_FAIL:
      if (localStorage) {
        localStorage.setItem('isLogged', false);
      }
      return {
        ...state
      };
    default:
      return state;
  }
}

export function login(values) {
  return (dispatch) => {
    dispatch({type: LOGIN});
    return fetch('/api/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(json => {
        if (json.status === 'OK') {
          return dispatch({type: LOGIN_SUCCESS, status: json.status});
        } else {
          return dispatch({type: LOGIN_FAIL, status: 'fail'});
        }
      });
  };
}
