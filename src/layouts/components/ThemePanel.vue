<script setup lang="ts">
const { themePanelShow } = storeToRefs(useAppStore());
</script>
<template>
  <n-drawer
    v-model:show="themePanelShow"
    :width="360"
    placement="right"
    :native-scrollbar="false"
  >
    <n-drawer-content>
      <template #header>
        <div flex-center gap1 cursor-default>
          <i text-xl i-ri-palette-fill></i>
          <span>主题设置</span>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
<style scoped lang="less"></style>
