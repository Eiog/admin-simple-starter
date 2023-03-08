<script setup lang="ts">
const { access } = storeToRefs(useAccessStore())
const options = [
  {
    label: 'Create',
    value: 0,
  },
  {
    label: 'Update',
    value: 1,
  },
  {
    label: 'Read',
    value: 2,
  },
  {
    label: 'Delete',
    value: 3,
  },
]
</script>

<route lang="yaml">
meta:
  menuGroup: 测试
  title: 权限测试
</route>

<template>
  <div wfull h200 flex-center rounded-xl bg="white dark:dark">
    <n-card title="权限测试" rounded="!xl" w="!120" shadow="!md">
      <n-select v-model:value="access" :options="options" multiple />
    </n-card>
  </div>
</template>

<style scoped lang="less"></style>
