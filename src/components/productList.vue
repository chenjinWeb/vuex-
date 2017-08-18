<template>
  <div>

    <div></div>

    <button>+</button>

    <ul>

      <li v-for="(l,$index) in list">{{l.name}} + {{l.age}}</li>

    </ul>

    <button @click="getListArr()">aaa</button>
  </div>
</template>

<script>

  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {Toast} from "mint-ui"

    export default {
      name:"productlist",
      data(){
        return {
          aaa:"aaa"
        }
      },
      computed:{
        ...mapState({
          list:state=>state.list
        })
      },
      methods:{
        ...mapMutations({
          getList:"getList"
        }),
        ...mapActions([
          "getList_",
          "getListArr_"
        ]),
        getListArr(){
          const data={
            endDate: "2017-08-18",
            ignoreNoData: false,
            limit: "25",
            page: 1,
            searchText: "",
            startDate: "2017-08-18"
          }
          this.getListArr_(data).then((res)=>{
            if(res.success==401){
              const data=[{name:'mcj',age:19},{name:"cl",age:10}]
              this.getList(data)
            }
          })
        }
      },
      mounted(){
          this.getList_().then((res)=>{
            console.info(res)
          },(err)=>{
            console.info(err)
          })
      }
    }

</script>

<style scoped>


</style>
