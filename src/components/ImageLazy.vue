<template>
  <img :src="src" alt="">
</template>

<script setup lang="ts">

defineProps({
  src: {
    type: String,
    required: true,
  },
  lazyimg: {
    type: String,
    default: "",
  }
})

</script>

<style lang="less" scoped></style>
