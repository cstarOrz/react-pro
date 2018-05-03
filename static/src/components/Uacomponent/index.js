import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {Message,Layout} from 'element-react';
import {withRouter} from 'react-router-dom';
import uaParser from 'ua-parser-js'
import {getBaseUa} from '../../utils/httpServers';
import PieOptions from '../../utils/charts/makePie'
import './index.less';

import asyncComponent from '../../components/asyncComponent/asyncComponent';

const PieChart = asyncComponent(() => import('../../components/PieChartComponent'));

@withRouter
@inject('store')
@observer
class Ua extends Component {
  constructor(props) {
    super(props)
    console.log('Ua-Component')
    this.state = {
      browserOption:{},
      osOption:{}
    }
  }
  componentWillMount() {
    this.handleData();
  }
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }
  handleData(data) {
    const pid = this.props.store.actived;
    const request = {};
    request.pid = pid;
    if(this.props.urlConfig) {
      request.url = this.props.urlConfig.url;
      request.router = this.props.urlConfig.router;
    }
    // request.version = 1;
    this.getPoint(request);
  }
  getPoint(data) {
    getBaseUa(data).then(res=>{
      if (res.status === 200 && res.data.status.code === 200) {
        // console.log(res.data.data)
        this.assignPoint(res.data.data);
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }

  assignPoint(data) {
    const uaBrowserSet = new Set();
    const uaOsSet = new Set();
    const uaList = [];
    let browserList = [];
    let osList = [];
    // let uaBrowserList = Object.keys(data.detail);
    // console.log(uaBrowserList.length)
    data.forEach(item => {
      let ua = uaParser(item);
      // console.log(ua.browser.name,ua.browser.version)
      if(ua.browser.name==='ie') ua.browser.name = 'IE';
      if(ua.browser.name==='qq'|| ua.browser.name==='qqbrowser') ua.browser.name = 'QQ';
      if(ua.browser.name==='chrome') ua.browser.name = 'Chrome';
      if(ua.browser.name==='firefox') ua.browser.name = 'Firefox';
      if(ua.browser.name==='IE') {
        if(+ua.browser.version===11) {
          ua.browser.name = 'IE 11'
        } else if(+ua.browser.version===10) {
          ua.browser.name = 'IE 10'
        } else if(+ua.browser.version===9) {
          ua.browser.name = 'IE 9'
        } else if(+ua.browser.version===8) {
          ua.browser.name = 'IE 8'
        }
      }
      uaBrowserSet.add(ua.browser.name);
      uaOsSet.add(ua.os.name);
      uaList.push(ua);
    });
    // console.log([...uaBrowserSet].sort(),'uaBrowserSet');
    // console.log(uaOsSet,'uaOsSet');
    
    [...uaBrowserSet].sort().forEach(item => {
      let list = [];
      uaList.forEach(element => {
        if(element.browser.name===item) {
          list.push(element)
        }
      });
      browserList.push({
        name:item,
        value:list.length
      });
    });
    uaOsSet.forEach(item => {
      let list = [];
      uaList.forEach(element => {
        if(element.os.name===item) {
          list.push(element)
        }
      });
      osList.push({
        name:item,
        value:list.length
      });
    });
    let browserOption = new PieOptions();
    let osOption = new PieOptions();
    browserOption.make(browserList,'浏览器');
    osOption.make(osList,'操作系统');
    this.setState({
      browserOption:browserOption.pieOption,
      osOption:osOption.pieOption
    })
  }
  render() {
    return (
      <div>
        <div className='table-box'>
          <p className='table-title'>埋点</p>
          <Layout.Row>
            <Layout.Col span="12"><PieChart option={this.state.browserOption} height='400px'>ContentPoint</PieChart></Layout.Col>
            <Layout.Col span="12"><PieChart option={this.state.osOption} height='400px'>ContentPoint</PieChart></Layout.Col>
          </Layout.Row>
        </div>
      </div>
    )
  }
}

export default Ua