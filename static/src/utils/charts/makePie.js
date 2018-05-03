export default class {
  constructor() {
    this.pieOption = {
      title: {
        text: '天气情况统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: []
      },
      series: [
        {
          name:'',
          type: 'pie',
          radius: '65%',
          center: [
            '50%', '50%'
          ],
          selectedMode: 'single',
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    // this.make(data,title);
  }
  make(data,title) {
    const legendData = [];
    data.forEach((item) => {
      legendData.push(item.name);
    });
    this.pieOption.legend.data = legendData;
    this.pieOption.series[0].data = data;
    this.pieOption.series[0].name = title;
    this.pieOption.title.text = title +'分布';
  }
}