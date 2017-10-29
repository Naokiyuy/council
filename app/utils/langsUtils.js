import {addLocaleData} from 'react-intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/zh';
import 'intl/locale-data/jsonp/de';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/pt';
import 'intl/locale-data/jsonp/ja';
import 'intl/locale-data/jsonp/ko';
import zhTW from './langs/zh_TW.json';
import zhLocaleData from 'react-intl/locale-data/zh';

const loadMessages = language => {
  const lang = language.substring(0, 2);

  switch (lang) {
    case 'zh':
      addLocaleData(zhLocaleData);
      return zhTW;
    default:
      addLocaleData(zhLocaleData);
      return zhTW;
  }
};

export default {
  loadMessages
};
