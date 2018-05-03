import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Top from '../../components/Top'
import './index.less'

@withRouter
@inject('store')
@observer
class Content extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props, 'Content-props')
    console.log('Content-Component')
  }
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  }
  render() {
    return (
      <div className="container">
        <Top></Top>
        <div className="info">
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    )
  }
}

export default Content