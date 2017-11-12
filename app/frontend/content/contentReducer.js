import queryString from 'query-string';
import _forEach from 'lodash/forEach';
import allColors from '../../utils/config/colors';
import councilNumber from '../../utils/config/councilNumber';

const LOAD = 'council/home/index/LOAD';
const LOAD_SUCCESS = 'council/home/index/LOAD_SUCCESS';

const initialState = {
  councilDataYearly:{data: {}, loaded: false},
  councilDataCouncil: {data: {}, loaded: false}
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
      } else {
        console.log(action.data);
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
      }
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