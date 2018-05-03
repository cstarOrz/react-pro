import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';

import theme from '../../utils/charts/theme'

import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import 'echarts/lib/chart/line';



class LineChart extends Component {
  constructor(props) {
    super(props);
    console.log('LineChart-Component');
    this.lineRef = React.createRef();
    this.init = this.init.bind(this);
    echarts.registerTheme('myTheme',theme);
  }
  init() {
    const { option={} } = this.props;
    // let myChart = echarts.init(this.ID,'myTheme',{renderer: 'svg'});
    let myChart = echarts.init(this.lineRef.current,'myTheme',{renderer: 'svg'});
    myChart.setOption(option)
    window.onresize = function() {
      myChart.resize()
    }
  }
  
  componentDidMount() {
    this.init()
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
    const { width="100%", height="300px" } = this.props
    return (
      // <div ref={ID => this.ID = ID} style={{width, height}}></div>
      <div ref={this.lineRef} style={{width, height}}></div>
    )
  }
}

export default LineChart