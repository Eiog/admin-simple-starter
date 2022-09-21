<script setup lang="ts">
const route = useRoute();
const matched = ref(useRoute().matched);
watch(
  () => route.matched,
  (newValue) => {
    matched.value = newValue;
    console.log(newValue);
  },
);
</script>
<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="(item, index) in matched"
      :key="index"
      :href="item.path"
    >
      <n-icon :component="item.meta.icon"></n-icon>
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
<style scoped lang="less"></style>
