//供给组件调用接口的集合
import {
  getList,
  getListArr,
  machineInfo
} from "../server/server"

const state={

}

const getters={

}

const actions={
  //async 表示这是一个async函数，await只能用在这个函数里面。
  //await等待promise返回结果了，再继续执行
  //await 后面跟着的应该是一个promise对象
  async getList_({commit,state}){
    return await getList();
  },
  async getListArr_({commit,state},data){
    return await getListArr(data)
  },
  async machineInfo_({commit,state},body){
    return await machineInfo(body)
  }
}

const mutations={

}

export default {
  state,
  getters,
  actions,
  mutations
}














