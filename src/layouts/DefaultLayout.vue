<script setup lang="ts">
import XsrLayouts from 'xsr-layouts';
const { layouts, sideCollapsed, layoutsMode } = storeToRefs(useAppStore());
</script>
<template>
  <xsr-layouts
    :mode="layoutsMode"
    :collapsed="sideCollapsed"
    :header="layouts.header"
    :sider="layouts.sider"
    :footer="layouts.footer"
    :main="{ padding: '10px' }"
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
        <default-menu></default-menu>
      </div>
    </template>
    <template #footer>
      <div wfull hfull bg="white dark:dark8">footer</div>
    </template>
    <div p3 overflow-hidden bg="gray1 dark:dark8">
      <router-entry />
    </div>
  </xsr-layouts>
</template>
<style scoped lang="less"></style>
