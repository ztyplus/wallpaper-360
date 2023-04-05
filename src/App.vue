<script setup lang="ts">
import { reactive, onMounted } from "vue"
import getImglist from "@/api/imglist"
import searchImgs from "@/api/search"
import debounce from "@/utils/debounce"
import Sidebar from "@/components/SideBar.vue"
import ImgViewer from "@/components/ImgViewer.vue"


interface State {
  cid: number;
  start: number;
  imglist: Array<any>;
  isLoading: boolean;
  showImg: any;
  currentIndex: number;
  toast: any;
  isSearch: boolean;
  keyword: string;
}

const state: State = reactive({
  cid: 10,
  start: 0,
  imglist: [],
  isLoading: true,
  showImg: null,
  currentIndex: 0,
  toast: {
    show: false,
    msg: "复制原图URL成功"
  },
  isSearch: false,
  keyword: ""
})


const getImages = (): void => {
  if (state.isSearch) {
    searchImgs(state.start, state.keyword).then(res => {
      if (res.errno === "0" && res.data) {
        state.imglist = state.imglist.concat(res.data)
        state.start += res.data.length
        state.isLoading = Number(res.total) > state.imglist.length
      }
    })
  } else {
    getImglist(state.cid, state.start).then(res => {
      if (res.errno === "0" && res.data) {
        state.imglist = state.imglist.concat(res.data)
        state.isLoading = Number(res.total) > state.imglist.length
        state.start += res.data.length
      }
    })
  }

}

const searchImg = (kw: string): void => {
  state.imglist = []
  state.start = 0
  state.isSearch = true
  state.keyword = kw
  state.isLoading = true
  searchImgs(state.start, kw).then(res => {
    if (res.errno === "0" && res.data) {
      state.imglist = state.imglist.concat(res.data)
      state.start += res.data.length
      state.isLoading = Number(res.total) > state.imglist.length
    }
  })
}

const changeCategory = (id: string): void => {
  state.imglist = []
  state.start = 0
  state.isSearch = false
  state.isLoading = true
  state.cid = Number(id)
  getImages()
}



const loadImages = debounce((): void => {
  let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 500;
  if (bottomOfWindow && state.isLoading) {
    getImages()
  }
}, 200)


const closeViewer = () => {
  state.showImg = null;
  // document.body.style.overflow = '';
}

const showViewer = (img: any, index: number) => {
  state.showImg = img;
  state.currentIndex = index
  // document.body.style.overflow = 'hidden';
}

const changeImage = (val: number) => {
  state.currentIndex = state.currentIndex + val;
  state.showImg = state.imglist[state.currentIndex]
}

const copyText = (text: string): void => {
  let result = false
  let textarea = document.createElement("textarea");
  textarea.value = text
  document.body.appendChild(textarea);

  textarea.select();

  if (document.execCommand("copy")) result = true
  document.body.removeChild(textarea);
  if (result) {
    state.toast.show = false;
    setTimeout(() => {
      state.toast.show = true;
    }, 100)
    setTimeout(() => {
      state.toast.show = false;
    }, 3000)
  }
}

getImages()

onMounted(() => {
  window.onscroll = () => {
    loadImages()
  }
})

</script>

<template>
  <div class="container">
    <div v-show="state.toast.show" class="toast-wrapper">{{ state.toast.msg }}</div>
    <div v-for="(img, index) in state.imglist" :key="img['id']" class="img-wrapper">
      <div class="img">
        <span class="copy" @click="copyText(img['url'].replace(/http:\/\//g, 'https://'))">URL</span>
        <img @click="showViewer(img, index)"
          v-lazy="(img['img_1024_768'] && img['img_1024_768'] !== 'no_data') ? img['img_1024_768'] : img['url']"
          src="@/assets/images/lazy.svg" :alt="img['utag']">
      </div>
    </div>
  </div>

  <Sidebar @searchImg="searchImg" @changeCategory="changeCategory" />

  <ImgViewer v-if="state.showImg" @closeViewer="closeViewer" @switchImg="changeImage" :total="state.imglist.length"
    :currentIndex="state.currentIndex" :src="state.showImg?.url" :resolution="state.showImg?.resolution"
    :desc="state.showImg?.utag" />


  <div class="loaded" v-if="!state.isLoading">
    <span>加载完毕...</span>
  </div>
</template>

<style lang="less">
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 5px;
  row-gap: 5px;
  padding: 5px;
}

.img {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;

  .copy {
    background-color: hsla(0, 100%, 1%, 0.4);
    font-size: 12px;
    padding: 2px 5px;
    border-radius: 2px;
    color: #fff;
    display: block;
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #222d46;
    }
  }
}

.img-wrapper:after {
  padding-top: 56.25%;
  content: '';
  display: block
}

.img-wrapper {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}



img {
  width: 100%;
  height: 100%;
  transition: all .3s;

  img:hover {
    transform: scale(1.05);
    filter: saturate(1.75)
  }
}

.toast-wrapper {
  color: #fff;
  background-color: #222d46;
  padding: 8px 16px;
  position: fixed;
  top: 20px;
  z-index: 99;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.loaded {
  width: 100%;
  text-align: center;
  margin: 10px 0 15px;

  span {
    background-color: rgb(255 255 255 / 20%);
    color: #fff;
    padding: 5px 16px;
    border-radius: 4px;
  }
}

@media (max-width: 1200px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 920px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}


@media (max-width: 500px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>



