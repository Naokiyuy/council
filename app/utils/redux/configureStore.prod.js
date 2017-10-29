import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {browserHistory} from 'react-router/es6';
import {reducer as notifReducer} from 're-notif';

const middleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      routing: routerReducer,
      form: formReducer,
      notifs: notifReducer,
      insights
    }),
    initialState,
    applyMiddleware(middleware, thunk)
  );
}
