import {combineReducers} from 'redux';
import proceedingsReducer from './proceedings/listProceedingsReducer';

export default combineReducers({
  proceedings: proceedingsReducer
});
