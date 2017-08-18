/*
* index:定义全局变量，加载modules
* mutations(state):处理挂载在state下面的变量，出发更新DOM，
* server:定义请求的方法，供给modules下面的JS使用
* */

import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import index from "./modules/index-module"


Vue.use(Vuex);

//state
const state={
  list:[]
}

const store = new Vuex.Store({
  state,
  getters:{},
  mutations,
  modules:{
    $index:index
  }
})

export default store




