import React, {Component} from 'react'
import {renderRoutes} from 'react-router-config'
import {withRouter} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import Qs from 'qs';
import List from './routerStatic'

const routes = [...List];

@withRouter
@inject('store')
@observer
class App extends Component {
  constructor(props, context) {
    super(props, context)
    console.log('App');
    this.setUrlParamsToStore();
  }
  formatParams() {
    const res = {};
    res.pid = this.props.store.actived;
    if(this.props.store.projectTime.startTime) res.start_time = this.props.store.projectTime.startTime;
    if(this.props.store.projectTime.endTime) res.end_time = this.props.store.projectTime.endTime;
    return res;
  }
  setUrlParamsToStore() {
    let isLoginPages = this.props.location.pathname.indexOf('/login')>-1;
    if(isLoginPages) return;
    let urlParams = Qs.parse(this.props.location.search.replace(/^\?/, ''));
    if(urlParams&&urlParams.pid) {
      if(urlParams.pid !== this.props.store.actived) this.props.store.updateActive(urlParams.pid);
      if(urlParams.start_time&&urlParams.end_time) {
        this.props.store.updateProjectTime({
          startTime:urlParams.start_time,
          endTime:urlParams.end_time
        });
      }
    } else {
      this.props.history.push({
        pathname: '/overview/list',
        search: '?'+ Qs.stringify(this.formatParams())
      });
    }
  }
  render() {
    return (
      <div className="main">
        <div>
        {renderRoutes(routes)}
        </div>
      </div>
    )
  }
}

export default App