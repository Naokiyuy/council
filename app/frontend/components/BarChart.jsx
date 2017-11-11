import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import colors from '../../utils/config/colors';
import _forEach from 'lodash/forEach';

export default class BarChart extends Component {
  render() {
    const data = [8,0,0,0,0,0,0,1,0,0,0,28,23,8,17,12,6,40,13,41,33,4,27,6,21,7,3,8,4,7,6,5,8,1,2,2,4,2,0,0,1,0,0,0,0,0,0,0,0,2,0,2,2,0,1,0,0,0,1,0,0,0,0,4,0];
    const categories = [];
    for (let i = 1946 ; i < 2011 ; i++) {
      categories.push(i);
    }
    const color = [];
    for (let i = 0 ; i < data.length ; i++) {
      color.push(colors.barchartcolors);
    }

    const config = {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: '議事錄數量'
        },
        labels: {
          // formatter: function () {
          //   return Math.abs(this.value) + '%';
          // }
        }
      },
      tooltip: {
        enabled: true,
        formatter: function() {
          return '謝東閔議員 於 <b>' + this.x + '</b> 年 議事錄數量 <b>' + this.y + '</b>';
        }
      },
      title: {
        text: '問政年表'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y;
            },
            inside: false
          }
        },
        series: {
          colorByPoint: true,
          colors: color
        }
      },
      legend: {
        enabled: false
      },
      series: [{data}]
    };

    return (
      <ReactHighcharts config={config}/>
    );
  }
}
