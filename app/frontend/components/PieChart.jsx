import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import colors from '../../utils/config/colors';
import _forEach from 'lodash/forEach';

export default class PieChart extends Component {
  render() {
    const data = [
      {
        "name": "臺灣省議會",
        "y": 8
      },
      {
        "name": "臺灣省臨時省議會",
        "y": 6
      },
      {
        "name": "臺中縣議會",
        "y": 2
      },
      {
        "name": "高雄市合併前直轄市議會",
        "y": 8
      },
      {
        "name": "高雄縣參議會",
        "y": 8
      },
      {
        "name": "新竹縣議會",
        "y": 3
      },
      {
        "name": "高雄縣議會",
        "y": 3
      },
      {
        "name": "基隆市議會",
        "y": 2
      },
      {
        "name": "臺北縣議會",
        "y": 2
      },
      {
        "name": "臺南縣議會",
        "y": 1
      },
      {
        "name": "高雄市省轄市議會",
        "y": 1
      }];

    let colorCnt = 0;
    _forEach(data, d => {
      d.color = colors.chartcolors[colorCnt];
      colorCnt++;
    });

    const config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      title: {
        text: '議會分布'
      },
      tooltip: {
        pointFormat: '<b>{point.y} ({point.percentage:.1f}%)</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: data
      }]
    };

    return (
      <ReactHighcharts config={config}/>
    );
  }
}
