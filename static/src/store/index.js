import {observable, action} from 'mobx'

class Store {
  @observable isLogin = false;
  @action login = () => {
    this.isLogin = true;
    return Promise.resolve(true);
  }
  @action loginOut = () => {
    this.isLogin = false;
  }

  @observable actived = '0';
  @action updateActive = (id) => {
    this.actived = id;
  }

  @observable projectList = [
    {
      name: '项目一',
      id: '0'
    }, {
      name: '项目二',
      id: '1'
    }
  ]
  @action updateProjectList = (arr) => {
    this.projectList = [].concat(arr);
  }

  @observable projectTime = {
    startTime: null,
    endTime: null
  }
  @action updateProjectTime = ({startTime, endTime}) => {
    this.projectTime.startTime = startTime;
    this.projectTime.endTime = endTime;
  }
}

export default new Store()