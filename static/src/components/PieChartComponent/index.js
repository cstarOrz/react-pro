import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';

import theme from '../../utils/charts/theme'

import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import 'echarts/lib/chart/pie';

class PieChart extends Component {
  constructor(props) {
    super(props);
    console.log('PieChart-Component');
    this.pieRef = React.createRef();
    this.init = this.init.bind(this);
    echarts.registerTheme('myTheme',theme);
  }
  init() {
    const { option={} } = this.props;
    // let myChart = echarts.init(this.ID,'myTheme',{renderer: 'svg'})
    let myChart = echarts.init(this.pieRef.current,'myTheme',{renderer: 'svg'});
    myChart.setOption(option);
    window.onresize = function() {
      myChart.resize()
    }
  }
  
  componentDidMount() {
    // console.log(this.pieRef);
    this.init();
  }
  
  componentDidUpdate() {
    this.init()
  }
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }
  render() {
    const { width="100%", height="300px" } = this.props;
    return (
      // <div ref={ID => this.ID = ID} style={{width, height}}></div>
      <div ref={this.pieRef} style={{width, height}}></div>
    )
  }
}

export default PieChart