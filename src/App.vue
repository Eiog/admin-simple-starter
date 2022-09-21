<script setup lang="ts">
const { darkMode, naiveThemeOverrides } = storeToRefs(useAppStore());
</script>
<template>
  <naive-provider :dark="darkMode" :theme-overrides="naiveThemeOverrides">
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </naive-provider>
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
