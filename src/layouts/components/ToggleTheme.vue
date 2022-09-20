<script setup lang="ts">
const { themePanelShow } = storeToRefs(useAppStore());
</script>
<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button secondary @click="themePanelShow = true">
        <i text-xl i-ri-palette-fill></i>
      </n-button>
    </template>
    主题设置
  </n-tooltip>
  <theme-panel />
</template>
<style scoped lang="less"></style>
