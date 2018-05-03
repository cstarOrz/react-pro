import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {withRouter, NavLink} from 'react-router-dom'
import Qs from 'qs';
import './left.less';

@withRouter
@inject('store')
@observer
class Left extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    // console.log(this.props, 'Left')
    // console.log(props, 'params')
    
    this.menuLink = [
      {
        name: '概览',
        action: '/list',
      },
      {
        name: '点赞',
        action: '/like',
      }, {
        name: '评论',
        action: '/comment',
      }, {
        name: '埋点',
        action: '/points',
      }
    ]
  }
  
  makeMeuns() {
    return this
      .menuLink
      .map((item, index) => <li key={index}>
        <NavLink
          to={{
          pathname: '/overview' + item.action,
          search: '?pid='+this.props.store.actived,
        }}
          activeClassName='link-actvie'
          className='link'>
          <i className="el-icon-menu"></i>{item.name}</NavLink>
      </li>);
  }
  componentDidUpdate() {
    let id = Qs.parse(this.props.location.search.replace(/^\?/, '')).pid;
    this.props.store.updateActive(id)
  }
  render() {
    let listsItem = this.makeMeuns();
    
    return (
      <div className="grid-content bg-purple">
        <ul className="meun">
          {listsItem}
        </ul>
      </div>
    )
  }
}

export default Left