import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import colors from '../../utils/config/colors';
import _forEach from 'lodash/forEach';
import Spinner from 'react-spinkit';

export default class PieChart extends Component {
  render() {
    const {data, loaded, callback, restore} = this.props;
    console.log(data);
    if (!loaded) {
      return (<Spinner style={{textAlign: 'center', lineHeight: '400px'}} spinnerName="three-bounce" noFadeIn/>);
    }

    const config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        events: {
          click: restore
        }
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
          showInLegend: true,
          point: {
            events: {
              click: callback(this.name)
            }
          }
        }
      },
      series: [{
        name: 'councils',
        colorByPoint: true,
        data: data.councilNumber
      }]
    };

    return (
      <ReactHighcharts config={config}/>
    );
  }
}
