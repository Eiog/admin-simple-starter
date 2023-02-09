<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import MessageDroupdownPanel from './MessageDroupdownPanel.vue'
const options: DropdownOption[] = [
  {
    key: 'render',
    type: 'render',
    render: () => {
      return h(MessageDroupdownPanel)
    },
  },
]
</script>

<template>
  <n-dropdown trigger="click" :show-arrow="true" :options="options">
    <n-badge :value="3">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button quaternary>
            <i text-xl i-ri-message-3-fill />
          </n-button>
        </template>
        消息
      </n-tooltip>
    </n-badge>
  </n-dropdown>
</template>

<style scoped lang="less"></style>
