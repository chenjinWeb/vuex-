//封装请求之前的处理
import axios from "axios"
import {baseUrl} from "./config"
import router from "vue-router"

import {Toast,Indicator} from "mint-ui"

//配置基础请求地址
axios.defaults.baseUrl=baseUrl;
axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout=2500;

Indicator.list = [];

let toast=null;

//自定义一个新的实例
let instance = axios.create({
  baseURL: baseUrl
});

// 添加请求拦截器interceptors
instance.interceptors.request.use((config)=>{
  //在发送之前做些什么
  Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
  Indicator.list.push(1);
  return config;
},(err)=>{
  //对请求错误做些什么
  Indicator.list.pop();
  Indicator.list.length === 0 && Indicator.close();
  toast && (toast.close());
  toast = Toast('请稍后重试！');
  return Promise.reject(err)
})


// 添加响应拦截器
instance.interceptors.response.use((response)=>{
  //对响应数据做些什么
  Indicator.list.pop();
  Indicator.list.length === 0 && Indicator.close();
  if(response.data.success==200){
    return response.data;
  }
  if(response.data.success==500){
    Toast(response.data.message)
  }
  //没有登录
  if(response.data.success==401){
    router.replace({name:"login"});
    return Promise.reject('not login');
  }
  return Promise.reject('not Data');
},(err)=>{
  //对响应错误做些什么
  Indicator.list.pop();
  Indicator.list.length === 0 && Indicator.close();
  toast && (toast.close());
  toast = Toast('请稍后重试！');
  return Promise.reject(err)
})

const http = instance;

export default http























