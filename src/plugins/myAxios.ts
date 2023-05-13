/**
 * Author:Shier
 * createTime:11:49
 * 拦截器
 */

//自定义实例默认值
import axios from "axios";

// 区分环境
const myAxios = axios.create({
// @ts-ignore
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8102/api' : 'http://partner.kongshier.top'
});
myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log("发送的请求", config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log("接收到的请求", response)
  // 未登录跳转到登录页
  if (response?.data?.code === 40100) {
    const redirectUrl = window.location.href;
    window.location.href = `/user/login?redirect=${redirectUrl}`;
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default myAxios;
