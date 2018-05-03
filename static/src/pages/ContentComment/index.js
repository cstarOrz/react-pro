import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {Message,Table,Loading,Button,Dialog} from 'element-react';
import {withRouter} from 'react-router-dom'
import {getComment} from '../../utils/httpServers';
import './index.less'

@withRouter
@inject('store')
@observer
class ContentComment extends Component {
  constructor(props) {
    super(props)
    console.log('ContentComment-Component')
    this.state = {
      showDialog: false,
      loading:true,
      columns: [
        {
          label: '页面',
          prop: 'pages'
        },{
          label: '酒店名称',
          // prop: 'hotel',
          render:(data)=>{
            const hotel = data.hotel;
            return (
              <div className='hotel-box'>{
                this.makeHotel(hotel,data)
              }</div>
            )
          }
        }
      ],
      data: [
      ],
      dialogData:[],
      dialogColumns:[{
        label: '酒店名称',
        prop: 'htl_name',
      },{
        label: '登录用户',
        prop: 'login_email',

      },{
        label: '评论内容',
        prop: 'comment',
      }]
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
  makeHotel(hotel,data){
    const arr = [];
    if(!hotel.size) return arr;
    hotel.forEach((item, index) => {
      arr.push(<Button className='mb10' onClick={this.showUsers.bind(this,data,item)} type='primary' key={item+index}>{item}</Button>)
    })
    return arr;
  }
  showUsers(data,item) {
    console.log('showUsers',data)
    const detail = [];
    data.detail.forEach(el => {
      if(el.htl_name===item) {
        detail.push(el);
      }
    });
    this.setState({
      showDialog:true,
      dialogData:detail
    })
  }
  handleDetail(data) {
    data.forEach((item) => {
      const dataSet = new Set();
      if(item.detail&&item.detail.length>0) {
        item.detail.forEach((detail) => {
          dataSet.add(detail.htl_name)
        });
      }
      item.hotel = dataSet;
    });
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
    this.getLike(request);
  }
  getLike(data) {
    getComment(data).then(res=>{
      if (res.status === 200 && res.data.status.code === 200) {
        this.assignLike(res.data.data);
      } else if(res.status === 200 && res.data.status.code === 100) {
        Message.error(res.data.status.msg);
        this.setState({loading:false})
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }
  assignLike(data) {
    this.handleDetail(data);
    this.setState({
      data:data,
      loading:false
    })
  }
  render() {
    return (
      <div id='content-comment'>
        <div className='table-box'>
          <p className='table-title'>评论</p>
          <Loading text='拼命加载中' loading={this.state.loading}>
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
        <Dialog
          title='评论详情'
          size='large'
          visible={ this.state.showDialog }
          onCancel={ () => this.setState({ showDialog: false }) }
        >
          <Dialog.Body>
            {this.state.showDialog && (
              <Table
              border={true}
              style={{width: '100%'}}
              stripe={true}
              columns={this.state.dialogColumns}
              data={this.state.dialogData} />
            )}
          </Dialog.Body>
        </Dialog>
      </div>
    )
  }
}

export default ContentComment