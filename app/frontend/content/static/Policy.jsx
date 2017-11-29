import React, {Component} from 'react';
import {Link} from 'react-router';

export default class policy extends Component {
  render() {
    const {params} = this.props;
    return (
      <div>
        <div className="breadcrumbs margin-bottom-50">
          <div className="container">
            <h1 className="pull-left">網路安全政策</h1>
            <ul className="pull-right breadcrumb">
              <li><Link to={`/frontend/${params.name}`}>首頁</Link></li>
            </ul>
          </div>
        </div>
        <div className="container s-results margin-bottom-50">
          <p>
            歡迎您光臨議員主題網（以下簡稱本網站）！為了讓您能夠更安心的使用本網站所提供的各項服務措施，特此向您說明本網站資訊安全政策如下：
          </p>
          <p>
            <b style={{textDecoration: 'underline'}}>個人資料之蒐集與運用</b><br/>
            當您參與本網站各項線上登錄資料或其他相關服務時，可能會請您提供相關個人資料或其他資料。本網站所蒐集的所有個人資料或其他資料，將依相關法令之規定，做為本網站所提供相關服務之用，不會任意對其他第三者揭露。此外，當您使用本網站時，本網站將自動收集下列資訊：日期和時間、您所擷取之網頁、您所在之網址、您的瀏覽器種類。這些資訊可能被用來改善本網站之效能，我們也可能監測對本網站造成重大負荷的網址上的行為。
          </p>
          <p>
            <b style={{textDecoration: 'underline'}}>資訊安全及保護</b><br/>
            本網站裝設有防火牆、入侵偵測系統、防毒系統及其他相關資訊安全設備及必要的安全防護措施，以防止網路非法入侵、破壞或資料竊取，當您使用本網站之各項服務功能時，任何儲存於本網站上之資料，將會受到完善保護，保障您的個人資料安全。
          </p>
          <p>
            <b style={{textDecoration: 'underline'}}>自我保護措施</b><br/>
            請妥善保管您的任何個人資料、密碼等資料，切勿將個人資料，尤其是密碼提供給任何第三人，以保障您的權益。
          </p>
        </div>
      </div>
    );
  }
}
