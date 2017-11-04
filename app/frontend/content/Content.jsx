import React, {Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import AmCharts from '@amcharts/amcharts3-react/amcharts3-react';

export default class Content extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="container content profile" style={{paddingBottom: '0px'}}>
        <div className="row margin-bottom-30">
          <div className="col-md-8 md-margin-bottom-40">
            <div className="headline"><h2>謝東閔議員</h2></div>
            <div className="row">
              <div className="col-sm-4">
                <img className="img-responsive margin-bottom-20" src="../../assets/frontend/img/index.jpg" alt="" />
              </div>
              <div className="col-sm-8">
                <p>謝東閔（1908年1月25日－2001年4月8日），原名謝進喜，自號求生，台灣半山政治人物，彰化廳北斗支廳二八水區二八水庄人（今彰化縣二水鄉光化村）。中華民國第六任副總統，是台灣本省人士中第一位擔任此要職者。晚年被人們尊稱為謝求公</p>
                <ul className="list-unstyled margin-bottom-20">
                  <li><i className="fa fa-check color-green"></i> 臺灣省訴願委員會主任委員 1946</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省行政長官公署民政處副處長 1946.10.1947.05</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省政府教育廳副廳長 1947.05-1953</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省政府委員</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省政府秘書長 1954.06.07-1957</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省臨時議會（第三屆）副議長 1957-1960</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省議會（第二屆）副議長 1960-1963</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省議會（第三屆）議長 1963-1968</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省議會（第四屆）議長 1968-1972</li>
                  <li><i className="fa fa-check color-green"></i> 臺灣省政府（第九任）主席 1972.06.06-1978.05.20</li>
                  <li><i className="fa fa-check color-green"></i> 總統府（第六任）副總統 1978.05.20-1984.05.20</li>

                </ul>
              </div>
            </div>

            <blockquote className="hero-unify">
              <p>謝東閔鑑於家為國之本，欲國家富強、民生樂利，必先健全家庭，曾向時任中華民國副總統陳辭修先生建議國家應成立三所專科學校－體育專科學校、藝術專科學校及家事專科學校。此建議後經政府採納，因而陸續有省立體育專科學校（今國立臺灣體育運動大學）、國立藝術學校（今國立臺灣藝術大學）的成立，唯家事專科學校的建議未被政府採納與執行，謝東閔便決定親自擘劃、建立一所家事專科學校（後正式創校時改稱家政專科學校）[6]，於1957年決定創辦家政學校。1958年3月26日，謝東閔成立中華民國第一所家政學校——私立實踐家政專科學校（今實踐大學）。1984年任台北語文學院名譽董事長。至今彰化縣田中鎮外環仍存有東閔路一段至三段，紀念謝東閔。</p>

            </blockquote>
          </div>
          <div className="col-md-4">
            <div className="headline"><h2>影像集錦</h2></div>
            <Carousel showThumbs={false} showArrows={true} showStatus={false}>
              <div>
                <img src="../../assets/frontend/img/a03.jpg" alt="" />
                <div className="legend">
                  <p>謝東閔在政治上的成就，採取精神與物質並重原則，先後提出小康計劃、消除髒亂運動</p>
                </div>
              </div>
              <div>
                <img src="../../assets/frontend/img/a02.JPG" alt="" />
                <div className="legend">
                  <p>謝東閔先生全集紀念委員會，謝東閔先生全集，台北：國史館</p>
                </div>
              </div>
              <div>
                <img src="../../assets/frontend/img/a00.jpg" alt="" />
                <div className="legend">
                  <p>台灣總統當選人陳水扁5月17日拜會總統府資政謝東閔，陳總統邀請謝東閔繼續擔任資政</p>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <div className="row">

          <div className="col-md-12">
            <div id="chartdiv2" style={{width: '100%', height: '400px'}}></div>
            <AmCharts.React
              style={{
                width: "100%",
                height: "500px"
              }}
              options={{
                "type": "pie",
                "titles": [{
                  "id": "Title-1",
                  "size": 15,
                  "text": "議會分布"
                }],
                "legend": {
                  "enabled": false,
                  "align": "center",
                  "markerType": "circle"
                },
                "dataProvider": [{
                  "category": "臺灣省議會",
                  "column-1": 8
                },
                  {
                    "category": "臺灣省臨時省議會",
                    "column-1": 6
                  },
                  {
                    "category": "臺中縣議會",
                    "column-1": 2
                  },
                  {
                    "category": "高雄市合併前直轄市議會",
                    "column-1": "8"
                  },
                  {
                    "category": "高雄縣參議會",
                    "column-1": "8"
                  },
                  {
                    "category": "新竹縣議會",
                    "column-1": "3"
                  },
                  {
                    "category": "高雄縣議會",
                    "column-1": "3"
                  },
                  {
                    "category": "基隆市議會",
                    "column-1": "2"
                  },
                  {
                    "category": "臺北縣議會",
                    "column-1": "2"
                  },
                  {
                    "category": "臺南縣議會",
                    "column-1": "1"
                  },
                  {
                    "category": "高雄市省轄市議會",
                    "column-1": "1"
                  }]
              }}
              />
          </div>

        </div>
        <div className="row" style={{marginTop: '40px'}}>
          <div className="col-md-6">
            <div id="chartdiv" style={{width: '100%', height: '400px', backgroundColor: '#FFFFFF'}} ></div>
          </div>
          <div className="col-md-6">
            <div className="tab-v1">
              <ul className="nav nav-tabs margin-bottom-20">
                <li className="active"><a data-toggle="tab" href="#home">相關議員</a></li>
                <li><a data-toggle="tab" href="#profile">相關地點</a></li>

              </ul>
              <div className="tab-content">
                <div id="home" className="tab-pane fade in active">
                  <div id="accordion-v1" className="panel-group acc-v1">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            張富
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            林生財
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            梁許春菊
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            賴榮木
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            吳一衛
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            蘇振輝
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            李源棧
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            陳火土
                          </a>
                        </h4>
                      </div>

                    </div>
                  </div>
                </div>

                <div id="profile" className="tab-pane fade">
                  <div id="accordion-v2" className="panel-group acc-v1">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            臺灣省
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            高雄市
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            臺中市
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            新竹縣
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            基隆市
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            新北市
                          </a>
                        </h4>
                      </div>

                    </div>
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h4 className="panel-title">
                          <a href="#" data-parent="#accordion-v1" data-toggle="collapse" className="accordion-toggle" style={{cursor:'default'}}>
                            臺南市
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container content">
            <div className="row ">
              <div className="col-md-4 col-sm-6">
                <div className="service-block service-block-sea service-or" style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                  <div className="service-bg"></div>
                  <i className="icon-custom icon-color-light rounded-x icon-line icon-notebook"></i>
                  <h2 className="heading-md">最新消息</h2>

                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="service-block service-block-red service-or" style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                  <div className="service-bg"></div>
                  <i className="icon-custom icon-color-light rounded-x icon-line icon-users"></i>
                  <h2 className="heading-md">相關新聞</h2>

                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="service-block service-block-blue service-or" style={{padding: '20px 10px 10px 10px', textAlign: 'center', marginBottom: '10px'}}>
                  <div className="service-bg"></div>
                  <i className="icon-custom icon-color-light rounded-x icon-line icon-rocket"></i>
                  <h2 className="heading-md">服務行程</h2>

                </div>
              </div>
            </div>

            <div className="row job-content">
              <div className="col-md-4 col-sm-6 md-margin-bottom-40">

                <ul className="list-unstyled categories">
                  <li><a href="#">1.最新消息標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">2.最新消息標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">3.最新消息標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">4.最新消息標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">5.最新消息標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">6.最新消息標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                </ul>
              </div>
              <div className="col-md-4 col-sm-6 md-margin-bottom-40">

                <ul className="list-unstyled categories">
                  <li><a href="#">1.相關新聞標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">2.相關新聞標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">3.相關新聞標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">4.相關新聞標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">5.相關新聞標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">6.相關新聞標題(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                </ul>
              </div>
              <div className="col-md-4 col-sm-6 md-margin-bottom-40">

                <ul className="list-unstyled categories">
                  <li><a href="#">1.服務行程(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">2.服務行程(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">3.服務行程(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">4.服務行程(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">5.服務行程(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                  <li><a href="#">6.服務行程(後台上稿)</a> <small className="hex">(1980-10-13)</small></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
