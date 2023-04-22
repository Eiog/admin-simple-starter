<script setup lang='ts'>
const { sideCollapsed } = storeToRefs(useAppStore())
</script>

<template>
  <div w-full h-12 flex-center>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-switch v-model:value="sideCollapsed" />
      </template>
      {{ sideCollapsed ? '展开' : '收起' }}侧边栏
    </n-tooltip>
  </div>
</template>

<style scoped lang='less'>

</style>
