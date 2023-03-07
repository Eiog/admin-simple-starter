<script setup lang="ts">
const { layoutOption, sideCollapsed, layoutMode } = storeToRefs(useAppStore())
</script>

<template>
  <layouts
    :mode="layoutMode"
    :collapsed="sideCollapsed"
    :header="layoutOption.header"
    :sider="layoutOption.sider"
    :footer="layoutOption.footer"
    :main="{
      contentStyle: { width: '100%', height: '100%' },
    }"
  >
    <template #header>
      <div wfull hfull flex="~ col" border="b" bg="white dark:dark8">
        <default-header />
        <default-tabs />
      </div>
    </template>
    <template #sider>
      <toggle-collapsed />
      <div wfull hfull bg="white dark:dark5" shadow-xl>
        <default-brand />
        <default-menu />
      </div>
    </template>
    <template #footer>
      <div wfull hfull bg="white dark:dark8">
        footer
      </div>
    </template>
    <div p2 overflow-hidden bg="gray1 dark:dark8">
      <router-entry />
    </div>
  </layouts>
</template>

<style scoped lang="less"></style>
