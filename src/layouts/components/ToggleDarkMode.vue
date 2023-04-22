<script setup lang="ts">
const { darkMode } = storeToRefs(useAppStore())
function toggleDark(e: MouseEvent) {
  useToggleDark(e, (dark) => {
    darkMode.value = !dark
  })
}
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button quaternary @click="toggleDark">
        <i text-xl :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'" />
      </n-button>
    </template>
    切换为{{ darkMode ? '亮色模式' : '暗色模式' }}
  </n-tooltip>
</template>

<style scoped lang="less"></style>
