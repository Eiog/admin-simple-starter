<script setup lang="ts">
const { toggle } = useFullscreen()
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button quaternary @click="toggle">
        <i text-xl i-ri-fullscreen-fill />
      </n-button>
    </template>
    全屏切换
  </n-tooltip>
</template>

<style scoped lang="less"></style>
