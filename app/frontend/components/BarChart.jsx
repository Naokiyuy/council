import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Spinner from 'react-spinkit';

export default class BarChart extends Component {
  render() {
    const {data, loaded, callback, restore, name} = this.props;

    if (!loaded) {
      return (<Spinner style={{textAlign: 'center', lineHeight: '400px'}} spinnerName="three-bounce" noFadeIn/>);
    }

    const nums = data.nums;
    const years = data.year;
    const colors = data.colors;

    const config = {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: years
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
          return name + '議員 於 <b>' + this.x + '</b> 年 議事錄數量 <b>' + this.y + '</b>';
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
          colors: colors,
          cursor: 'pointer',
          point: {
            events: {
              click: callback(this)
            }
          }
        }
      },
      legend: {
        enabled: false
      },
      series: [{data:nums}]
    };

    return (
      <ReactHighcharts config={config}/>
    );
  }
}
