<script setup lang="ts">
const { sideCollapsed } = storeToRefs(useAppStore());
</script>
<template>
  <div
    absolute
    top="50%"
    right="0"
    translate-y="-1/2"
    translate-x="4"
    w-8
    h-8
    transition-all
    rounded-full
    flex-center
    cursor-pointer
    shadow="md hover:xl"
    bg="white"
    @click="sideCollapsed = !sideCollapsed"
  >
    <i
      text-3xl
      i-ri-arrow-right-s-line
      transition-transform
      duration-500
      :class="sideCollapsed ? 'rotate-0' : 'rotate-180'"
    ></i>
  </div>
</template>
<style scoped lang="less"></style>
