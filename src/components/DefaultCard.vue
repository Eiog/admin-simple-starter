<script setup lang="ts">
const props = defineProps<{ title?: string }>()
</script>

<template>
  <div flex flex-col min-w-0 bg="white dark:dark" rounded-xl px5 py1>
    <slot name="header">
      <div wfull h-12 flex items-center border-b>
        <h1 text-xl>
          {{ props.title }}
        </h1>
      </div>
    </slot>
    <slot />
  </div>
</template>

<style scoped lang="less"></style>
