import axios from 'axios';
// http request 拦截器
axios.interceptors.request.use((config) => {
  // console.log(config,'interceptors-request')
  return config;
}, (err) => {
  return Promise.reject(err);
});
// http response 拦截器
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.resolve(error.response);
});
export default axios;