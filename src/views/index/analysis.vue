<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div wfull h200 flex-center rounded-xl bg="white dark:dark">
    <h1 text-3xl>{{ t('welcome') }}</h1>
  </div>
</template>
<style scoped lang="less"></style>
