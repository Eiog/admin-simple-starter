<script setup lang="ts">
const { authTabs, currentTabIndex } = storeToRefs(useAccessStore());
const router = useRouter();
const handleClick = (path?: string) => {
  if (!path) return;
  router.push(path);
};
const handleClose = (index: number) => {
  console.log(index);
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
        :type="index === currentTabIndex ? 'success' : 'default'"
        cursor="pointer!"
        @click="handleClick(item.path)"
        @close="handleClose(index)"
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
