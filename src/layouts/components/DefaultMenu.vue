<script setup lang="ts">
const { sideCollapsed, layoutOption, darkMode } = storeToRefs(useAppStore());
const { authMenu } = storeToRefs(useAccessStore());
const route = useRoute();
const path = ref(route.path);
const router = useRouter();
const handleClick = (key: string) => {
  router.push(key);
};
watch(
  () => route.path,
  (newPath) => {
    path.value = newPath;
  },
);
</script>
<template>
  <n-menu
    :collapsed="sideCollapsed"
    :collapsed-width="layoutOption.sider.collapsedWidth"
    :collapsed-icon-size="26"
    :inverted="darkMode"
    mode="vertical"
    :options="authMenu"
    :value="path"
    @update:value="handleClick"
  />
</template>
<style scoped lang="less"></style>
