<script setup lang="ts" name="access-test">
const { access } = storeToRefs(useAccessStore());
const options = [
  {
    label: '0b1000',
    value: 0b1000,
  },
  {
    label: '0b0100',
    value: 0b0100,
  },
  {
    label: '0b0010',
    value: 0b0010,
  },
  {
    label: '0b0001',
    value: 0b0001,
  },
];
const initAccess = () => {
  const res: number[] = [];
  options.forEach((item) => {
    if ((access.value & item.value) === item.value) res.push(item.value);
  });
  return res;
};
const accessValue = ref(initAccess());

const handleUpdateValue = (value: number[]) => {
  if (value.length === 0) return (access.value = 0b0000);
  access.value = Object.values(value).reduce((_val, val) => {
    return _val | val;
  });
};
</script>
<template>
  <div wfull h200 flex-center rounded-xl bg="white dark:dark">
    <n-card title="权限测试" rounded="!xl" w="!120" shadow="!md">
      <n-select
        v-model:value="accessValue"
        :options="options"
        multiple
        @update-value="handleUpdateValue"
      />
    </n-card>
  </div>
</template>
<style scoped lang="less"></style>
