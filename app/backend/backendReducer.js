import {combineReducers} from 'redux';
import proceedingsReducer from './proceedings/listProceedingsReducer';
import newsReducer from './news/listNewsReducer';
import messagesReducer from './messages/listMessagesReducer';
import servicesReducer from './services/listServicesReducer';
import profileReducer from './profile/profileReducer';

export default combineReducers({
  proceedings: proceedingsReducer,
  news: newsReducer,
  messages: messagesReducer,
  services: servicesReducer,
  profile: profileReducer
});
