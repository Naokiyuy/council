import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer-v1">
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 md-margin-bottom-40">
                <div className="posts">
                  <div className="headline"><h2>整合訊息</h2></div>
                  <ul className="list-unstyled latest-list">
                    <li>
                      <a href="#">公告訊息</a>
                    </li>
                    <li>
                      <a href="#">新聞訊息</a>
                    </li>
                    <li>
                      <a href="#">議事訊息</a>
                    </li>
                    <li>
                      <a href="#">服務行程</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 md-margin-bottom-40">
                <div className="headline"><h2>系統訊息</h2></div>
                <ul className="list-unstyled link-list">
                  <li><a href="#">資訊安全政策</a></li>
                  <li><a href="#">隱私權保護政策</a></li>
                  <li><a href="#">建議瀏覽器：Chrome、Firefox、Safari、IE10以上版本 (螢幕最佳顯示效果為1280*960 )</a></li>
                </ul>
              </div>
              <div className="col-md-4 map-img md-margin-bottom-40">
                <div className="headline"><h2>聯絡我們</h2></div>
                <address className="md-margin-bottom-40">
                  <a href="#">粉絲專業</a><br />
                  <a href="#">聯絡信箱</a><br />

                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
