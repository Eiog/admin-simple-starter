<script setup lang="ts">
const { themePanelShow } = storeToRefs(useAppStore())
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button quaternary @click="themePanelShow = true">
        <i text-xl i-ri-palette-fill />
      </n-button>
    </template>
    主题设置
  </n-tooltip>
  <theme-panel />
</template>

<style scoped lang="less"></style>
