<script setup lang="ts">
const { tabs, authTabs, currentTabPath, authTabIndex } = storeToRefs(
  useAccessStore(),
);
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
  </div>
</template>
<style scoped lang="less"></style>
