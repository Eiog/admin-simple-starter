<script setup lang="ts">
import { DropdownOption, NAvatar } from 'naive-ui';
const { darkMode, themePanelShow } = storeToRefs(useAppStore());
const options: DropdownOption[] = [
  {
    key: 'header',
    type: 'render',
    render: () => {
      return h('div', { class: 'flex-center gap2 px3 py1' }, [
        h(
          NAvatar,
          {
            round: true,
            src: 'http://aman-blog-oss.oss-cn-beijing.aliyuncs.com/2022-8-5/20190927103132_ZPTkU-2a8f20438489e4068a057f5e0f5458c0.jpeg',
          },
          {},
        ),
        h('div', { class: 'flex flex-col' }, [
          h('span', { class: 'text-lg' }, { default: () => '阿满' }),
        ]),
      ]);
    },
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    key: 'setting',
    label: '个人设置',
    icon: () => {
      return h('i', { class: 'i-ri-user-settings-fill' }, {});
    },
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    key: 'logout',
    label: '退出登录',
    icon: () => {
      return h('i', { class: 'i-ri-logout-circle-fill' }, {});
    },
  },
];
const handleSelect = () => {};
</script>
<template>
  <div ml-auto flex-center gap3 mr10>
    <n-button secondary @click="themePanelShow = true">
      <i text-xl i-ri-palette-fill></i>
    </n-button>
    <n-button secondary @click="darkMode = !darkMode">
      <i text-xl :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"></i>
    </n-button>
    <n-button secondary>
      <i text-xl i-ri-fullscreen-fill></i>
    </n-button>
    <n-dropdown
      trigger="hover"
      :show-arrow="true"
      :options="options"
      @select="handleSelect"
    >
      <n-avatar
        ml3
        mr3
        cursor-pointer
        size="small"
        round
        src="http://aman-blog-oss.oss-cn-beijing.aliyuncs.com/2022-8-5/20190927103132_ZPTkU-2a8f20438489e4068a057f5e0f5458c0.jpeg"
      ></n-avatar>
    </n-dropdown>
  </div>
</template>
<style scoped lang="less"></style>
