<template>
  <div class="sidebar transform" :style="{ 'right': toggleSidebar ? '0' : '-320px' }">

    <div class="search-wrapper">
      <input class="input-inner" @keydown.enter="searchImg" type="text" autocomplete="off" v-model="keyword"
        placeholder="输入关键词回车搜索">
      <img class="search-icon" src="@/assets/images/search.svg">

      <div class="category">
        <div v-for="item in cateData" class="cate" :key="item.id" @click="changeCategory(item.id)">{{ item.name }}</div>
      </div>

    </div>

  </div>
  <button class="more" @click="handlerSidebar"></button>
  <div v-show="toggleSidebar" class="overlay transform" @click="handlerSidebar"></div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import cateData from "@/assets/data.json"

const emits = defineEmits<{
  (e: 'searchImg', keyword: string): void
  (e: 'changeCategory', id: string): void
}>()


const toggleSidebar = ref(false)

const keyword = ref(null)

const searchImg = () => {
  if (keyword.value) {
    emits('searchImg', keyword.value)
    handlerSidebar()
  }
}

const changeCategory = (id: string) => {
  emits('changeCategory', id)
  handlerSidebar()
}

const handlerSidebar = () => {
  toggleSidebar.value = !toggleSidebar.value
  document.body.style.overflow = toggleSidebar.value ? 'hidden' : '';
}

</script>

<style lang="less" scoped>
.sidebar {
  position: fixed;
  width: 320px;
  background-color: #222d46;
  top: 0;
  height: 100vh;
  z-index: 99;
  padding: 16px;
}

.more {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-image: url("@/assets/images/more.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, .05);
  z-index: 10;
}

.search-wrapper {
  height: 40px;
  width: 100%;
  position: relative;
}

.input-inner {
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  border: 1px solid #eeeeee51;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  width: 100%;
  padding-right: 30px;
  background-color: hsla(0, 0%, 100%, .14) !important;
  color: #fff;
}

input::placeholder {
  color: #ddd;
  font-size: 14px;
}

.category {
  display: grid;
  margin-top: 1rem;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;

  .cate {
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: #293550;
    color: #fff;
    border-radius: 5px;

    &:hover {
      background-color: #3f537f;
    }
  }
}
</style>
