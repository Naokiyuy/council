import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    const {name} = this.props;
    return (
      <div className="footer-v1 footer-custom">
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 md-margin-bottom-40">
                <div className="posts">
                  <div className="headline"><h2>整合訊息</h2></div>
                  <ul className="list-unstyled latest-list">
                    <li>
                      <Link to={`/frontend/${name}/others/info`}>公告訊息</Link>
                    </li>
                    <li>
                      <Link to={`/frontend/${name}/others/news`}>新聞訊息</Link>
                    </li>
                    <li>
                      <Link to={`/frontend/${name}/others/council`}>議事訊息</Link>
                    </li>
                    <li>
                      <Link to={`/frontend/${name}/others/service`}>服務行程</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 md-margin-bottom-40">
                <div className="headline"><h2>系統訊息</h2></div>
                <ul className="list-unstyled latest-list">
                  <li><Link to={`/frontend/${name}/others/policy`}>資訊安全政策</Link></li>
                  <li><Link to={`/frontend/${name}/others/privacy`}>隱私權保護政策</Link></li>
                  <li style={{color: 'white'}}>建議瀏覽器：Chrome、Firefox、Safari、IE10以上版本 (螢幕最佳顯示效果為1280*960 )</li>
                </ul>
              </div>
              <div className="col-md-4 map-img md-margin-bottom-40">
                <div className="headline"><h2>聯絡我們</h2></div>
                <address className="md-margin-bottom-40">
                  <ul className="list-unstyled latest-list">
                    <li><a href="mailto:ccouncil@ntu.edu.tw">聯絡信箱</a></li>
                  </ul>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
