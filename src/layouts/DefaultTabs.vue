<script setup lang="ts">
import type { DropdownOption } from 'naive-ui';
const { tabs, authTabs, currentTabPath, authTabIndex } = storeToRefs(
  useAccessStore(),
);
const { refresh } = useAccessStore();
const router = useRouter();
const handleClick = (path?: string) => {
  if (!path) return;
  router.push(path);
};
const handleClose = (path: string) => {
  if (authTabs.value.length <= 1) return;
  const removeIndex = tabs.value.findIndex((item) => item.path === path);
  if (currentTabPath.value === path) {
    const newIndex =
      authTabIndex.value === 0
        ? authTabs.value.length - 1
        : authTabIndex.value - 1;
    const nextPath = authTabs.value[newIndex].path;
    router.push(nextPath);
  }
  tabs.value.splice(removeIndex, 1);
};
const options: DropdownOption[] = [
  {
    label: '关闭其他',
    key: 'closeOther',
    props: {
      onClick: () => {
        if (authTabs.value.length <= 1) return;
        let current = authTabs.value[authTabIndex.value];
        tabs.value = [current];
      },
    },
  },
  {
    label: '关闭全部',
    key: 'closeAll',
    props: {
      onClick: () => {
        tabs.value = [];
        router.push('/');
      },
    },
  },
];
</script>
<template>
  <div wfull h-40px flex items-center gap2 px3>
    <b-scroll ref="bsScrollRef">
      <n-tag
        v-for="(item, index) in authTabs"
        :key="index"
        :bordered="false"
        closable
        :type="index === authTabIndex ? 'success' : 'default'"
        cursor="pointer!"
        @click="handleClick(item.path)"
        @close="handleClose(item.path)"
      >
        <span flex-center gap1 px3>
          <component :is="item.icon"></component>
          <span>{{ item.title }}</span>
        </span>
      </n-tag>
    </b-scroll>
    <n-button quaternary circle @click="refresh">
      <i i-ri-refresh-line></i>
    </n-button>
    <n-dropdown trigger="hover" :options="options">
      <n-button quaternary circle>
        <i i-ri-menu-5-fill></i>
      </n-button>
    </n-dropdown>
  </div>
</template>
<style scoped lang="less"></style>
