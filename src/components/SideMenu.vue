<template>
    <el-drawer title="壁纸分类" v-model="drawer" 
    :lock-scroll="false"
    :with-header="false">
      <SearchBox></SearchBox>
      <el-row :gutter="10">
          <el-col :span="24">
              <router-link :to="{name:'index'}" class="grid-content home">
                  <img src="@/assets/images/home.svg" alt="最近更新">
                  <span>HOME</span>
              </router-link>
          </el-col>
          <el-col  v-for="item in sort" :key="item.id" :span="12">
              <router-link :to="{name:'index',query:{'id':item.id}}" class="grid-content">
                  <img src="@/assets/images/plane.svg" :alt="item.name">
                  <span>{{item.name}}</span>
              </router-link>
          </el-col>
      </el-row>
    </el-drawer>
  <img class="affix" @click="drawer = !drawer" src="@/assets/images/more.svg">
</template>

<script>
import { GET } from '@/utils/request'
import { reactive,onMounted,toRefs,ref } from 'vue'
import SearchBox from '@/components/SearchBox'
export default {
  name: 'SideMenu',
  components: {SearchBox},
  setup(){     
    const state = reactive({
      sort:[],
    })

    const methods = {
      initData(){
        methods.getSort()
      },
      getSort(){
        let params = {c:'WallPaper',a:'getAllCategoriesV2',from:'360chrome'}
        GET('/360/index.php',{params}).then( res => {
          if (res.data.errmsg == '正常'){state.sort = res.data.data}
        })
      },
    }

    onMounted(()=>{
      methods.initData()
    })

    return {
      ...toRefs(state), 
      methods,
      drawer: ref(false),
    }
  }
}
</script>

<style lang="less">
* {
  padding:0;
  margin:0;
  text-decoration: none;
}
#app {
  min-height:100vh;
}
.affix {
    width: 2.5rem;
    height: 2.5rem;
    position: fixed;
    bottom: 5%;
    right: 2.5rem;
    z-index: 9999;
    cursor: pointer;
}
.el-drawer {
    width:320px !important;
    background-color: #222d46 !important;
    padding: 1rem;
    .home {
      width: 270px!important;
      span {
        display: inline-block;
        text-align: center;
      }
    }
    .grid-content {
        margin: .5rem 0;
        border-radius: 4px;
        width: 120px;
        padding: .5rem;
        display: flex;
        color: #fff;
        display: flex;
        background-color:#293550;
        cursor: pointer;
        align-items: center;
        img{
            padding-right: .5rem;
            width: 1.5rem;
            height: 1.5rem;
            vertical-align: middle;
            fill: currentColor;
            overflow: hidden;
        }
    }
}
.grid-content:hover {
    color: #fff;
    background-color: #29f;
    background-image: linear-gradient(135deg, rgba(35, 153, 255) 0%, rgba(84, 175, 253) 100%);
    box-shadow: 0 3px 3px rgba(0, 40, 70, .3);
}
</style>

