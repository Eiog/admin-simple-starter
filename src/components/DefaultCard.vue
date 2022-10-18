<script setup lang="ts">
const props = defineProps<{ title?: string }>();
</script>
<template>
  <div flex flex-col min-w-0 bg="white dark:dark" rounded-xl px5 py1>
    <slot name="header">
      <div wfull flex items-center>
        <h1>{{ props.title }}</h1>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>
<style scoped lang="less"></style>
