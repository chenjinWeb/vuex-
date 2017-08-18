//定义请求的接口
import http from "../axios"
import qs from "qs"
import {baseUrl} from "../config"
import {jsonp} from "../../jsonp"


//定义请求的接口
export const getList = ()=>{
  return http.get(`indexData/initReport`)
}

export const getListArr=(body={})=>{
  let query = qs.stringify(body);
  return http.post(`campaign/list`,query)
}

export const machineInfo = (body = {}) => {
  return jsonp(`${baseUrl}get/machine_info`,body);
};








