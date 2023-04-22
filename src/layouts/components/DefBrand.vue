<script setup lang="ts">
const { sideCollapsed } = storeToRefs(useAppStore())
</script>

<template>
  <div w-full h-16 flex-y-center px3>
    <SvgIcon name="拨浪鼓" :width="3" :height="3" />
    <h1 v-if="!sideCollapsed" text-xl>
      EiogAdmin
    </h1>
  </div>
</template>

<style scoped lang="less"></style>
