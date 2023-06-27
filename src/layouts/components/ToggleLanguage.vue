<script setup lang="ts">
const { language } = storeToRefs(useAppStore())
function changeLanguage() {
  language.value = language.value === 'zh_cn' ? 'en_us' : 'zh_cn'
}
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button quaternary @click="changeLanguage">
        <i text-xl i-ri-translate />
      </n-button>
    </template>
    语言切换
  </n-tooltip>
</template>

<style scoped lang="less"></style>
