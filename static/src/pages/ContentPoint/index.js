import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {Message,Loading,Table,Button,Dialog} from 'element-react';
import {withRouter} from 'react-router-dom';
import {getPointHotel} from '../../utils/httpServers';
import './index.less';


@withRouter
@inject('store')
@observer
class ContentPoint extends Component {
  constructor(props) {
    super(props)
    console.log('ContentPoint-Component')
    this.state = {
      loading:true,
      showDialog: false,
      columns: [
        {
          label: '酒店名称',
          prop: 'htl_name'
        },{
          label: '访问次数',
          prop: 'times',
          width: 150,
        }, {
          label: '操作',
          width: 150,
          render: (data) => {
            return (
              <div>
                {data.mens.length>0
                  ? <Button
                      type='info'
                      size='small'
                      onClick={this
                      .detail
                      .bind(this, data)}>查看详情</Button>
                  : ''}
              </div>
            )
          }
        }
      ],
      data: [
      ],
      dialogData:[],
      dialogColumns:[{
        label: '登录用户',
        prop: 'name',
      },{
        label: '用户职务',
        prop: 'position',

      },{
        label: '访问次数',
        prop: 'times',
      }]
    }
  }
  componentWillMount() {
    this.handleData();
  }
  componentWillUnmount (){
    this.setState = (state,callback)=>{
      return;
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname || nextProps.location.search !== this.props.location.search) {
      console.log('point-update-nextProps')
      this.handleData();
    }
  }
  handleData(data) {
    const request = this.formatParams();
    if(this.props.urlConfig) {
      request.url = this.props.urlConfig.url;
      request.router = this.props.urlConfig.router;
    }
    // console.log(request,'request-point')
    // request.version = 1;
    this.getPoint(request);
  }
  getPoint(data) {
    getPointHotel(data).then(res=>{
      if (res.status === 200 && res.data.status.code === 200) {
        this.assignPoint(res.data.data);
      } else if(res.status === 200 && res.data.status.code === 100) {
        Message.error(res.data.status.msg);
        this.setState({loading:false})
      } else {
        Message.error('错了哦，错了哦，错了哦！');
      }
    })
  }

  assignPoint(data) {
    this.setState({
      data:data,
      loading:false
    });
  }
  detail(data) {
    // console.log(data,'data')
    this.setState({
      showDialog:true,
      dialogData:data.mens
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
      <div id='content-point'>
        <div className='table-box'>
          <p className='table-title'>埋点</p>
          <Loading text='拼命加载中' loading={this.state.loading}>
            <Table
              border={true}
                style={{
                width: '100%'
              }}
                columns={this.state.columns}
                data={this.state.data}
                stripe={true}
                default-sort = "{prop: 'date', order: 'descending'}"/>
            </Loading>
            <Dialog
              title={'访问人员详情'}
              size='small'
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
      </div>
    )
  }
}

export default ContentPoint