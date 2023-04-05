<template>
  <div class="image-loader-container">
    <img class="placeholder" src="../assets/images/loading.svg" alt="" v-show="!hasLoaded">
    <img class="origin" :src="src" @load="handleLoad" :class="{ 'hidden': !hasLoaded }" :alt="desc">
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue"

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  desc: {
    type: String,
  },
  duration: {
    type: Number,
    default: 500
  }
})

const hasLoaded = ref(false)

const handleLoad = () => {
  hasLoaded.value = true
}

watchEffect(() => {
  if (props.src) {
    hasLoaded.value = false
  }
})



</script>

<style lang="less" scoped>
.image-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
  }

  .placeholder {
    width: 80px;
    height: 80px;
    position: relative;
  }

}
</style>
