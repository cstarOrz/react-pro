import axios from './http';
import {Time, Base,Like,Point} from './resetApi';
import Qs from 'qs'

// export function postOverview(params) {   
// return axios.post(ACTION.overview,
// params); }
function tranformParas(params) {
  return (params)=>{
    return Qs.stringify(params).replace(/%3A/g, ':')
  }
}
export function getTime(params) {
  return axios.get(Time.Time, {params: params});
}

export function getBase(params) {
  return axios.get(Base.Base, {
    params: params,
    paramsSerializer: tranformParas(params)
  });
}

export function getBasePage(params) {
  return axios.get(Base.BasePage, {
    params: params,
    paramsSerializer: tranformParas(params)
  });
}
export function getBasetTransfer(params) {
  return axios.get(Base.BasetTransfer, {
    params: params,
    paramsSerializer: tranformParas(params)
  });
}
export function getTransfers(funs) {
  return new Promise((resolve, reject)=>{
    axios.all(funs).then(axios.spread((basePage, basetTransfer)=>{
      const arr = [];
      arr.push(basePage);
      arr.push(basetTransfer);
      resolve(arr);
    }));
  })
}

export function getBaseUa(params) {
  return axios.get(Base.BaseUa, {
    params: params
  });
}

export function getLike(params) {
  return axios.get(Like.Like, {
    params: params
  });
}
export function getComment(params) {
  return axios.get(Like.Comment, {
    params: params
  });
}

export function getPoint(params) {
  return axios.get(Point.Point, {
    params: params,
    paramsSerializer: tranformParas(params)
  });
}
export function getPointHotel(params) {
  return axios.get(Point.PointHotel, {
    params: params,
    paramsSerializer: tranformParas(params)
  });
}