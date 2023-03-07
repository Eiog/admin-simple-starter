<script setup lang="ts">
useHead({
  title: 'vue3 starter',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.v-leave-active,
.v-enter-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from {
  transform: scale(1.05);
  opacity: 0;
}

.v-leave-to {
  transform: scale(0.98);
  opacity: 0;
}
</style>
