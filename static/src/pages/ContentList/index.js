import React, {Component} from 'react'
import {Message, Progress, Table, Button,Loading} from 'element-react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {getBasePage,getTime} from '../../utils/httpServers';
import makeLine from '../../utils/charts/makeLine';
import './index.less'

// import ReactHighcharts from 'react-highcharts';
import asyncComponent from '../../components/asyncComponent/asyncComponent';

const LineChart = asyncComponent(() => import('../../components/LineChartComponent'));
const UaComponent = asyncComponent(() => import('../../components/Uacomponent'));



@withRouter
@inject('store')
@observer
class ContentList extends Component {
  constructor(props) {
    super(props)
    console.log('ContentList-Component')
    this.state = {
      option:{},
      loading:true,
      columns: [
        {
          label: '资源地址',
          prop: 'url'
        }, {
          label: '模块名称',
          prop: 'title',
          width: 150
        }, {
          label: 'PV',
          prop: 'pv',
          width: 100
        }, {
          label: 'UV',
          prop: 'uv',
          width: 100
        }, {
          label: '点赞',
          prop: 'like',
          width: 100
        }, {
          label: '评论',
          prop: 'comment',
          width: 100
        }, {
          label: '转化率',
          prop: 'transfer',
          width: 100,
          render:(data)=>{
            let transfer = (+data.transfer * 100).toFixed(2);
            // transfer = transfer>100?100:transfer;
            return (
              <div className='progress-box'>
                {data.transfer?(transfer>100?(<span className='progress-text'>{transfer + '%'}</span>):<Progress type="circle" strokeWidth={2} width={60} percentage={transfer} />):''}
              </div>
              
            )
          }
        }, {
          label: '操作',
          width: 100,
          render: (data) => {
            return (
              <div>
                {data.transfer
                  ? <Button
                      type='info'
                      size='small'
                      onClick={this
                      .detail
                      .bind(this, data)}>查看</Button>
                  : ''}
              </div>
            )
          }
        }
      ],
      data: []
    }
  }
  componentWillMount() {
    this.handleData();
  }
  handleData(data) {
    const request = this.formatParams();
    this.getBasePage(request);
    this.getTime({pid:request.pid});
  }

  getBasePage(data) {
    getBasePage(data).then(res=>{
      if (res.status === 200 && res.data.status.code === 200) {
        this.assignBasePage(res.data.data);
      }else if(res.status === 200 && res.data.status.code === 100) {
        Message.error(res.data.status.msg);
        this.setState({loading:false})
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }
  getTime(data) {
    getTime(data).then(res=>{
      if (res.status === 200 && res.data.status.code === 200) {
        this.assignTimeData(res.data.data);
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }

  assignBasePage(data) {
    this.setState({data: data,loading:false})
  }
  assignTimeData(data) {
    const res = makeLine(data);
    this.setState({
      option:res
    })
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname || nextProps.location.search !== this.props.location.search) {
      console.log('-------------')
      console.log('update-list-content')
      this.handleData();
    }
  }
  detail(data) {
    // console.log(data,'detail');
    this
      .props
      .history
      .push({
        pathname: '/overview/detail',
        search: '?pid=' + this.props.store.actived+'&urls=' +encodeURIComponent(data.url),
        state: data
      })
  }
  formatParams() {
    const res = {};
    res.pid = this.props.store.actived;
    if(this.props.store.projectTime.startTime) res.start_time = this.props.store.projectTime.startTime;
    if(this.props.store.projectTime.endTime) res.end_time = this.props.store.projectTime.endTime;
    return res;
  }
  render() {
    return (
      <div id='content-list'>
        <div className='table-box'>
          <p className='table-title'>分页信息</p>
          <Loading loading={this.state.loading}>
            <Table
              border={true}
              style={{
              width: '100%'
            }}
              columns={this.state.columns}
              data={this.state.data}
              stripe={true}/>
            </Loading>
        </div>
        <div className='chart-box'>
          <LineChart option={this.state.option} height='400px'></LineChart>
        </div>
        <div className='chart-box'>
          <UaComponent></UaComponent>
        </div>
      </div>
    )
  }
}

export default ContentList