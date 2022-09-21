<script setup lang="ts">
import { DropdownOption, NAvatar } from 'naive-ui';
const { userInfo, refreshed, token } = storeToRefs(useAccessStore());
const router = useRouter();
const handleLogOut = () => {
  token.value = undefined;
  refreshed.value = false;
  router.push('/login');
};
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
            src: userInfo.value?.avatar,
          },
          {},
        ),
        h('div', { class: 'flex flex-col' }, [
          h(
            'span',
            { class: 'text-lg' },
            { default: () => userInfo.value?.name },
          ),
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
    props: {
      onClick: handleLogOut,
    },
    icon: () => {
      return h('i', { class: 'i-ri-logout-circle-fill' }, {});
    },
  },
];
const handleSelect = () => {};
</script>
<template>
  <n-dropdown
    trigger="hover"
    :show-arrow="true"
    :options="options"
    @select="handleSelect"
  >
    <n-avatar ml3 mr3 cursor-pointer round :src="userInfo?.avatar"></n-avatar>
  </n-dropdown>
</template>
<style scoped lang="less"></style>
