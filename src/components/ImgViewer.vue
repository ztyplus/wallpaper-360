<template>
  <div @click="handleClose" class="img-viewer">

    <div @click="handleClose" class="close">
      <div class="icon bg"></div>
    </div>

    <div class="img-wrapper">
      <div class="img">
        <ImageLoader :src="src.replace(/http:\/\//g, 'https://')" :desc="desc" />
      </div>

      <div class="resolution tag">{{ resolution }}</div>
      <div class="img-info tag">{{ desc }}</div>

      <div v-if="currentIndex !== 0" @click="handleChange(-1)" class="prev bg"></div>
      <div v-if="currentIndex !== total - 1" @click="handleChange(1)" class="next bg"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import ImageLoader from "@/components/ImageLoader.vue"

defineProps({
  src: {
    type: String,
    default: null
  },
  desc: {
    type: String
  },
  resolution: {
    type: String
  },
  total: {
    type: Number,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'closeViewer'): void,
  (e: 'switchImg', index: number): void
}>()

const handleClose = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.classList.value === 'img-viewer' || target.classList.value === 'icon bg' || target.classList.value === 'close') {
    emits('closeViewer')
  }
}

const handleChange = (val: number) => {
  emits('switchImg', val)
}

</script>

<style lang="less" scoped>
.img-viewer {
  padding: 1rem;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;

  .img-wrapper {
    max-height: 95%;

    img {
      object-fit: contain;
      width: auto;
    }


  }

}


.img-wrapper {
  width: 100%;
}

.bg {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  background-color: rgba(0, 0, 0, 0.4);
}

.prev,
.next {
  width: 40px;
  height: 60px;
  position: absolute;
  top: 50%;
  padding: 16px;
  transform: translateY(-50%);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.prev {
  background-image: url("@/assets/images/prev.svg");
  z-index: 999;
  left: 5px;
}

.next {
  background-image: url("@/assets/images/next.svg");
  right: 5px;
}

.close {
  background-color: transparent;
  position: fixed;
  z-index: 100;
  border: 30px solid transparent;
  border-right-color: #000;
  border-top-color: #000;
  top: 0;
  right: 0;
  cursor: pointer;

  .icon {
    position: fixed;
    top: 2px;
    right: 2px;
    width: 30px;
    height: 30px;
    background-image: url("@/assets/images/close.svg");
    background-size: 60%;
  }
}

.img-info {
  z-index: 99;
  position: absolute;
  bottom: 0;
  color: #fff;
}

.tag {
  margin: 5px;
  background-color: hsla(0, 100%, 1%, 0.4);
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
  color: #fff;
}

.resolution {
  right: 5px;
}
</style>
