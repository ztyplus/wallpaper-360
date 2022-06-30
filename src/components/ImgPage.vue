<template>
  <div class="imglist">
    <photo-provider :photoClosable="false" :shouldTransition="true">
      <el-row :gutter="0" >
        <el-col v-for="item in dataList" :key="item.id" :span="12" :xs="24" :md="8" :xl="6">
          <div class="imgbox img-169">
            <div class="copyurl" @click="methods.copyUrl(item.url)">copyUrl</div>
            <photo-consumer :intro="item.utag" class="item"  :src="item.url">
              <img :src="item.img_1024_768 ? item.img_1024_768 : item.url" class="transform view-box">
              <span>{{item.utag}}</span>
            </photo-consumer>
          </div>
        </el-col>
      </el-row>
    </photo-provider>
  </div>
  <div class="bottom">
    <span v-if="!isLoading">别划了，已经到底了...</span>
    <span  v-if="isLoading">图片努力加载中...</span>
  </div>
  <FootBox></FootBox>
</template>
<script>
import { GET } from '@/utils/request'
import { reactive,onMounted,toRefs } from 'vue'
import { useRoute } from "vue-router"
import EventBus from '@/utils/EventBus'
import FootBox from '@/components/FootBox'
import {ElMessage} from 'element-plus'
import useClipboard from 'vue-clipboard3'
export default {
    name: "ImgPage",
    components: {FootBox},
    setup(){    
      const route = useRoute()
      let api = ""
      const state = reactive({
        dataList:[],
        start: 0,
        isLoading: true,
        cid: '',
        total: 0,
        kw:''
      })
    const methods = {
      initData(){
        methods.getData(0)
        state.start = state.start + 24
      },
      getData(start){
        if(route.query.id) {
           api = '/360/index.php?c=WallPaper&a=getAppsByCategory&cid='+route.query.id+'&start='+start+'&count=24&from=360chrome'
        }else if(route.query.kw){
          api = '/search/index.php?c=WallPaper&a=search&start='+start+'&count=24&kw='+route.query.kw
        }else {
          //  api = '/360/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start='+start+'&count=24&from=360chrome'
           api = '/360/index.php?c=WallPaper&a=getAppsByCategory&cid=36&start='+start+'&count=24&from=360chrome'
        }
        GET(api).then( res => {
          if (res.data.errmsg == '正常' || res.data.errmsg == 'success'){
            if(state.dataList.length === 0) {
              state.dataList = res.data.data
            }else {
              state.dataList = state.dataList.concat(res.data.data)
            }
            state.dataList = JSON.parse(JSON.stringify(state.dataList).replace(/http:\/\//g,"https://"))
            if(start == 0) {state.total = res.data.total}
          }
          if(state.start > state.total) {
              state.isLoading = false
          }
        })
      },
      scroll() {
        window.onscroll = () => {
            // 距离底部200px时加载一次
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200;
            if (bottomOfWindow && state.isLoading && state.start == state.dataList.length) {
                methods.getData(state.start)
                state.start = state.start + 24
            }
        }
      },
      copyUrl(url){
        const { toClipboard } = useClipboard()
        toClipboard(url)
        ElMessage({ message: "复制原图URL成功！", type: "success" });
      }
    }

    onMounted(()=>{
      methods.initData()
      methods.scroll()
    })
    EventBus.on('upList', data => {
      state.kw = data.kw
      state.isLoading = true
      state.start = 0
      state.dataList = []
      methods.getData(0)
    })
    return {
      ...toRefs(state), 
      methods,
    }
  }
}
</script>

<style lang="less">
.imglist {
  margin: 0px auto;
}
.imgbox {
  position: relative;
  .item {
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0;
    margin: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    img:hover {
      transform: scale(1.02);
      filter: saturate(1.75);
    }
    span {
      display: inline-block;
      position: absolute;
      bottom: 10px;
      font-size: 12px;
      left: 10px;
      color: #fff;
      background:rgba(50,50,50,.25);
      padding: 2px 5px;
      border-radius: 4px;
    }
  }
}
.bottom {
  color: #fff;
  padding: 1rem;
  text-align: center;
}
.img-169:after {
    padding-top: 56.25%;
    content: '';
    display: block;
}
.PhotoSlider__Backdrop {
    background: rgb(0 0 0 / 70%)!important;
}
.PhotoView__PhotoWrap {
  // max-width:90%;
  .PhotoView__PhotoBox {
    width: 100%;
  }
  img {
    width: 100%;
  }
  .PhotoView__Photo::after{
    padding-top: 56.25%;
    content: '';
    display: block;
  }
}
.copyurl {
  position: absolute;
  top: .5rem;
  right: .5rem;
  font-size: 12px;
  width: 50px;
  color: #fff;
  background: rgba(50, 50, 50, 0.25);
  padding: 2px 5px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 9;
}
.copyurl:hover {
  background-color: #2997f7;
}
.transform {
    -webkit-transition: all 0.3s!important;
    -moz-transition: all 0.3s!important;
    -o-transition: all 0.3s!important;
    -ms-transition: all 0.3s!important;
    transition: all 0.3s!important;
}
</style>