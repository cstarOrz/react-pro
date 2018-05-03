import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom'
import {Layout,Select,Message,Icon} from 'element-react';
import Qs from 'qs';
import {getBase} from '../../utils/httpServers';
import Searchs from '../SearchComponent'

import './index.less'

@withRouter
@inject('store')
@observer
class Top extends Component {
  constructor(props) {
    super(props);
    console.log('Top-Component')
    this.props = props;
    // let isLogin = props.store.isLogin; if(!isLogin) {
    // this.props.history.push(`/login`) }
    this.state = {
      path: '/type',
      type: 'overview',
      showTimeDialog:false,
      pv: 0,
      uv: 0,
      comment: 0,
      like: 0,
      point: 0,
      options: [{
        value: '0',
        label: '项目一'
      },{
        value: '1',
        label: '项目二'
      }],
      value: '0'
    }
  }
  componentWillMount() {
    this.handleData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname || nextProps.location.search !== this.props.location.search) {
      console.log('top-update-nextProps')
      this.handleData();
    }
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  handleData() {
    const request = this.formatParams();
    this.getBase(request);
  }
  getBase(data) {
    getBase(data).then((res) => {
      if (res.status === 200 && res.data.status.code === 200) {
        this.assignBase(res.data.data);
      } else if(res.status === 200 && res.data.status.code === 100) {
        Message.error(res.data.status.msg);
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }
  assignBase(data) {
    const {pv,uv,like,comment,point} = data;
    this.setState({pv,uv,like,comment,point})
  }
  onChange(value) {
    this.props.store.updateActive(value);
    this.props.history.push({
      pathname: '/overview/list',
      search: '?'+Qs.stringify(this.formatParams())
    })
  }
  linkTo(path) {
    // console.log(this.props.location.pathname,'this.props.location.pathname ');
    let pathname = this.props.location.pathname;
    let linkPath = '/overview/'+path;
    if(linkPath === pathname) return;
    this
      .props
      .history
      .push({
        pathname: '/overview/'+path,
        search: '?' + Qs.stringify(this.formatParams())
      })
  }
  showTime(date) {
    // console.log(date,'date')
    this.props.store.updateProjectTime({
      startTime:date.start_time,
      endTime:date.end_time,
    });
    this.props.history.push({
      search: '?'+ Qs.stringify(this.formatParams())
    });
  }
  formatParams() {
    const res = {};
    res.pid = this.props.store.actived;
    if(this.props.store.projectTime.startTime) res.start_time = this.props.store.projectTime.startTime;
    if(this.props.store.projectTime.endTime) res.end_time = this.props.store.projectTime.endTime;
    return res;
  }
  render() {
    const {pv,uv,like,comment,point} = this.state;
    return (
      <div>
        <div className="header clearfix">
          <h1 className='logo'>JOINTWISDOM</h1>
          <div className='project'>
            <Select className='project-select' value={this.state.value} onChange={this.onChange.bind(this)}>
            {
              this.state.options.map(el => {
                return <Select.Option key={el.value} label={el.label} value={el.value} />
              })
            }
            </Select>
          </div>
          <div className='project-date' onClick={this.showTime.bind(this)}>
            <Icon name='date' />
            <Searchs showTime={this.showTime.bind(this)}></Searchs>
          </div>
        </div>
        <Layout.Row className='tags-con'>
          <Layout.Col span="6" className='tags-list'>
            <div className='tags-box'>
              <p className='tags-value'>{pv}</p>
              <p className='tags-title tags-link' onClick={this.linkTo.bind(this,'list')}>PV</p>
            </div>
          </Layout.Col>
          <Layout.Col span="6" className='tags-list'>
            <div className='tags-box'>
              <p className='tags-value'>{uv}</p>
              <p className='tags-title tags-link' onClick={this.linkTo.bind(this,'list')}>UV</p>
            </div>
          </Layout.Col>
          <Layout.Col span="4" className='tags-list'>
            <div className='tags-box'>
              <p className='tags-value'>{like}</p>
              <p className='tags-title tags-link' onClick={this.linkTo.bind(this,'like')}>点赞</p>
            </div>
          </Layout.Col>
          <Layout.Col span="4" className='tags-list'>
            <div className='tags-box'>
              <p className='tags-value'>{comment}</p>
              <p className='tags-title tags-link' onClick={this.linkTo.bind(this,'comment')}>评论</p>
            </div>
          </Layout.Col>
          <Layout.Col span="4" className='tags-list'>
            <div className='tags-box'>
              <p className='tags-value'>{point}</p>
              <p className='tags-title tags-link' onClick={this.linkTo.bind(this,'point')}>埋点</p>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Top