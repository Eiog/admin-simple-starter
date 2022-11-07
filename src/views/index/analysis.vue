<script setup lang="ts">
const { t } = useI18n();
onDeactivated(() => {
  onActivated(() => {});
});
</script>
<template>
  <default-card h-209 title="分析页">
    <div wfull flex-center rounded-xl bg="white dark:dark">
      <h1 text-3xl>{{ t('welcome') }}</h1>
      <n-button type="primary">Primary</n-button>
    </div>
  </default-card>
</template>
<style scoped lang="less"></style>
