import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {Table,Message,Loading} from 'element-react';
import {withRouter} from 'react-router-dom';
import Qs from 'qs';
import {getBasePage} from '../../utils/httpServers';
import ContentLike from '../ContentLike/index';
import ContentComment from '../ContentComment/index';
import ContentPoint from '../ContentPoint/index';
import './index.less'

@withRouter
@inject('store')
@observer
class ContentDetail extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props, 'ContentDetail-props')
    console.log('ContentDetail-Component')
    this.state = {
      loading:true,
      columns: [
        {
          label: '资源地址',
          prop: 'url'
        },{
          label:'模块名称',
          prop: 'title',
          width: 150
        },{
          label: '来源地址',
          prop: 'referrerUrl',
        }, {
          label: 'PV',
          prop: 'pv',
          width: 100
        }
      ],
      data: [
      ]
    }
    let urlParms = Qs.parse(this.props.location.search.replace(/^\?/, ''));
    let urls = urlParms.urls.split('#');
    // console.log(urlParms.url.split('#'),'urlParms')
    this.urlConfig = {
      pid:urlParms.pid,
      urls:urlParms.urls,
      url:urls[0],
      router:urls[1]
    }
  }
  componentWillMount() {
    const state = this.props.location.state;
    if(!state) {
      this.getBasePage({
        pid:0
      })
    }else {
      this.tranformData(this.props.location.state);
    }
    // this.getLike({
    //   pid:this.urlConfig.pid,
    //   url:this.urlConfig.url,
    //   router:this.urlConfig.router
    // })
  }
  tranformData(data) {
    const res = [];
    const url = data.url;
    const referrer = data.info.referrer;
    const referrerKeys = Object.keys(referrer);
    referrerKeys.forEach((key) => {
      const obj = {};
      obj.url = url;
      obj.title = referrer[key].title;
      obj.referrerUrl = key;
      obj.pv = referrer[key].pv;
      res.push(obj);
    });
    this.setState({
      data:res,
      loading:false
    });
  }
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }
  getBasePage(data) {
    getBasePage(data).then(res=>{
      if (res.status === 200 && res.data.status.code === 200) {
        this.filterData(res.data.data)
      } else if(res.status === 200 && res.data.status.code === 100) {
        Message.error(res.data.status.msg);
        this.setState({loading:false})
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }
  filterData(data) {
    let res;
    data.forEach((item)=>{
      if(item.url===this.urlConfig.urls) {
        res = item;
      }
    });
    this.tranformData(res);
  }
  render() {
    return (
      <div id='content-detail'>
        <div className='table-box'>
          <p className='table-title'>分页转化率</p>
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
        <ContentLike urlConfig={this.urlConfig}></ContentLike>
        <ContentComment urlConfig={this.urlConfig}></ContentComment>
        <ContentPoint urlConfig={this.urlConfig}></ContentPoint>
      </div>
    )
  }
}

export default ContentDetail