const lineOption = {
  title: {
    text: '时间点击分布图'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['小时']
  },
  grid : {
    top: '100',
    right: '100',
    bottom: '60',
    left: '100'
  },
  xAxis: [
    {
      type: 'category',
      offset:10,
      boundaryGap: false,
      data: [

      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel:{
        formatter: '{value} 次'
      }
    }
  ],
  series: [
    {
      name: '小时',
      type: 'line',
      data: [
      ]
    }
  ]
};
function tranformHour(val) {
  return val>9?(val+':00'):('0'+val+':00')
}
export default function (data) {
  const seriesData = [];
  const xAxisData = [];
  data.forEach((item) => {
    seriesData.push(item.count);
    xAxisData.push(tranformHour(item.hour));
  });
  lineOption.xAxis[0].data = xAxisData;
  lineOption.series[0].data = seriesData;
  return lineOption;
  // return {
  //   seriesData,
  //   xAxisData
  // }
}
