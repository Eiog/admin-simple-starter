<script setup lang="ts">
import autoAnimatefrom from '@formkit/auto-animate';
const { layoutOption, sideCollapsed } = storeToRefs(useAppStore());
const domRef = ref();
onMounted(() => {
  autoAnimatefrom(domRef.value);
});
</script>
<template>
  <div
    flex-center
    wfull
    cursor-default
    ref="domRef"
    :style="{ height: `${layoutOption.header.height}px` }"
  >
    <h1 v-if="!sideCollapsed" text-2xl>XsRoleAdmin</h1>
    <h1 v-if="sideCollapsed" text-2xl>XsR</h1>
  </div>
</template>
<style scoped lang="less"></style>
