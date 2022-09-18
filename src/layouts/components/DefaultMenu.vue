<script setup lang="ts">
import { NIcon } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import RiCpuLine from '~icons/ri/cpu-line';
import { Component } from 'vue';
import { useAccessStore } from '~/stores/useAccessStore';
const { sideCollapsed, layouts, darkMode } = storeToRefs(useAppStore());
const { baseRoutes } = storeToRefs(useAccessStore());
const renderIcon = (icon: Component) => {
  return h(NIcon, null, {
    default: () => h(icon),
  });
};

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
    icon: () => renderIcon(RiCpuLine),
  },
];
</script>
<template>
  <n-menu
    :collapsed="sideCollapsed"
    :collapsed-width="layouts.sider.collapsedWidth"
    :collapsed-icon-size="26"
    :inverted="darkMode"
    mode="vertical"
    :options="menuOptions"
  />
</template>
<style scoped lang="less"></style>
