<script setup lang="ts">
import XsrLayouts from 'xsr-layouts';
const { darkMode, layouts, sideCollapsed, layoutsMode } = storeToRefs(
  useAppStore(),
);
</script>
<template>
  <naive-provider :dark="darkMode">
    <xsr-layouts
      :mode="layoutsMode"
      :collapsed="sideCollapsed"
      :header="layouts.header"
      :sider="layouts.sider"
      :footer="layouts.footer"
      :main="{ padding: '10px' }"
    >
      <template #header>
        <div wfull hfull flex="~ col" border="b">
          <default-header />
          <default-tabs />
        </div>
      </template>
      <template #sider>
        <toggle-collapsed />
        <div wfull hfull bg="white" shadow-xl>
          <default-brand />
          <default-menu></default-menu>
        </div>
      </template>
      <template #footer>
        <div>footer</div>
      </template>
      <router-entry />
      <theme-panel />
    </xsr-layouts>
  </naive-provider>
</template>
<style scoped lang="less"></style>
