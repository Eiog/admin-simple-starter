<script setup lang="ts"></script>
<template>
  <div ml-auto flex-center gap3 mr6>
    <user-droupdown />
    <message-droupdown />
    <toggle-theme />
    <toggle-dark-mode />
    <toggle-full-screen />
    <toggle-language />
    <toggle-notification />
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button quaternary>
          <a
            href="https://github.com/xsrole/template-admin-simple"
            i-ri-github-fill
            target="_blank"
            rel="noopener noreferrer"
            text-xl
          ></a>
        </n-button>
      </template>
      Github
    </n-tooltip>
  </div>
</template>
<style scoped lang="less"></style>
