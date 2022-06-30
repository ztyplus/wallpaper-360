<template>
  <div class="search">
        <div class="input">
          <el-input placeholder="输入关键词回车搜索" v-model="keyword" @keyup.enter="methods.search(keyword)" clearable> </el-input>
          <img class="search-icon" src="@/assets/images/search.svg" />
        </div>
        <div class="hotitem">
          <div class="hottitle"><img src="@/assets/images/hot.svg" alt="热门搜索"><span>热门搜索</span></div>
          <div class="hottag">
              <span v-for="(item,index) in hotList" :key="index" @click="methods.search(item)">{{item}}</span>
          </div>
        </div>
  </div>
</template>

<script>
import { reactive,toRefs,onMounted } from 'vue'
import { GET } from '@/utils/request'
import EventBus from '@/utils/EventBus'
import { useRouter } from 'vue-router'
export default {
    name:"SearchBox",
    setup(){
        const router = useRouter()
        const state = reactive({
            keyword:"",
            hotList: []
        })
        const methods = {
            initData(){
                methods.hotData()
            },
            hotData(){
                GET('/360hot/html/api/wallpaperhot.html').then( res => {
                    if (res.data.error == 0){state.hotList = res.data.data}
                })
            },
            search(kw){
                router.push('/?kw='+kw)
                EventBus.emit('upList',{kw:kw})
            },
        }
        onMounted(()=>{
            methods.initData()
        })

        return {
            ...toRefs(state),
            methods
        }
    }
}
</script>

<style lang="less">
.search {
    padding: .5rem;
    background-color: #293550;
    border-radius: 4px;
    input {
        background-color: rgb(255 255 255 / 14%)!important;
        caret-color:#fff;
        color:#fff;
    }
    .input {
        position: relative;
        display: flex;
        align-items: center;
        .search-icon {
            position: absolute;
            right: .5rem;
        }
    }
    .hotitem{
        margin-top: 1rem;
        .hottitle {
            display: flex;
            align-items: center;
            span {
                display: inline-block;
                color: #fff;
                font-size: 1rem;
                padding-left: .5rem;
            }
        }
        .hottag {
            margin-top: .5rem;
            span {
                display: inline-block;
                white-space: nowrap;
                margin: 5px;
                cursor: pointer;
                color: #eee;
                padding: 2px 5px;
                border-radius: 2px;
                font-size:12px;
                background-color:rgb(136 136 136 / 10%);
            }
            span:hover {color: #fff;background-color: #29f;}
        }
    }
}
</style>